# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Swift Route is a **pnpm monorepo** with two apps:

- `apps/swift-route` — NestJS 11 backend (TypeScript)
- `apps/swift-app` — Expo / React Native mobile app (TypeScript, Expo Router)

The `packages/` directory holds shared packages consumed by both apps:

- `packages/types` — shared TypeScript types and enums (`@swift-route/types`)
- `packages/seed-data` — shared seed data and ID constants (`@swift-route/seed-data`), used by both the backend store and mobile tests

Ignore `apps/swift-app/app-example/` — it is the Expo scaffold template, not live code.

## Package Manager

Always use **pnpm**. The workspace is defined in `pnpm-workspace.yaml` with hoisted node linking.

## Backend (`apps/swift-route`)

NestJS monorepo managed via the Nest CLI. Entry point: `apps/swift-route/src/main.ts`, listening on `PORT` env var or `3000`.

```bash
# from repo root
pnpm start:dev        # watch mode (recommended for development)
pnpm build            # compile via webpack to dist/
pnpm lint             # ESLint with auto-fix
pnpm test             # Jest unit tests (*.spec.ts under apps/)
pnpm test:e2e         # E2E tests (apps/swift-route/test/jest-e2e.json)
pnpm format           # Prettier format all apps/**/*.ts
```

Run a single test file:
```bash
pnpm test -- apps/swift-route/src/delivery-jobs/delivery-jobs.controller.spec.ts
```

### Domain model

The core entity is `DeliveryJob` (defined in `packages/types`):

```
DeliveryJob { id, pickupAddress, dropoffAddress, packageType, status, notes[], courier, createdAt, updatedAt }
Courier     { id, name }
DeliveryNote{ id, note, deliveryId, createdAt }
```

`DeliveryStatus` enforces a one-way state machine: `ASSIGNED → IN_TRANSIT → DELIVERED`. Any invalid transition throws `422 UnprocessableEntityException`.

### NestJS architecture

Single feature module: `DeliveryJobsModule` → `DeliveryJobsController` → `DeliveryJobsService`.

**DTOs follow a two-type pattern** — an `*Input` type (snake_case, matches API body) and a `*Model` class (implements `DeliveryJob`, transforms input to camelCase domain shape). The model constructor handles all transformation, e.g. converting `courier: string` → `Courier` object with a generated UUID.

**In-memory data store**: There is no database. Three module-level arrays in `src/stores/` (`deliveryJobsStore`, `courierStore`, `deliveryNotesStore`) act as seed data. `DeliveryJobsService` holds a reference to `deliveryJobsStore` and mutates it directly.

### REST endpoints

All routes under `/delivery-jobs`:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/delivery-jobs?courierId=&status=` | Find jobs by courier (required) and optional status |
| GET | `/delivery-jobs/all?courierId=&status=` | Same but validates `courierId` as UUID via `ParseUUIDPipe` |
| GET | `/delivery-jobs/:id` | Get single job |
| POST | `/delivery-jobs` | Create job (status defaults to `ASSIGNED`) |
| PUT | `/delivery-jobs/:id` | Full replace |
| PATCH | `/delivery-jobs/:id` | Partial update |
| PATCH | `/delivery-jobs/:id/status` | Advance status (enforces state machine) |
| DELETE | `/delivery-jobs/:id` | Delete job (204) |

### Testing

Unit tests spin up real `NestJS TestingModule` instances with real service — no mocks. Tests are **stateful and ordered within a describe block**: status-transition tests advance a single job (`JOB_IDS.chris_assigned`) through the full lifecycle across multiple `it()` calls, relying on Jest's sequential execution to carry state between them.

`JOB_IDS` and `COURIER_IDS` constants in `packages/seed-data/src/job-ids.ts` are the canonical IDs to use in tests.

### Seed data

Three couriers are seeded: `jungkook`, `sophia`, `chris`. Each has three jobs covering all three statuses. `JOB_IDS.ian` is a non-existent ID used to test 404 cases.

## Mobile App (`apps/swift-app`)

Expo SDK 54 + React Native 0.81 using **Expo Router** (file-based routing).

```bash
cd apps/swift-app
pnpm start            # Expo dev server (press i/a/w for iOS/Android/web)
pnpm ios              # iOS simulator
pnpm android          # Android emulator
pnpm lint             # expo lint (ESLint)
```

Run mobile tests (one-shot, from repo root):
```bash
pnpm --filter ./apps/swift-app test -- --watchAll=false
```

### Routing structure

- `app/_layout.tsx` — root Stack navigator
- `app/index.tsx` — My Jobs list screen
- `app/delivery-job/[id].tsx` — Job Detail screen

### State management

Two Zustand stores:

- `store/delivery-jobs.store.ts` — holds `jobs[]`, `loading`, `error`, `prevJobs` (snapshot for optimistic rollback). `advanceJobStatus` applies optimistic updates; `revertJobStatus` restores `prevJobs` on API failure.
- `store/courier.store.ts` — holds the selected `courierId` (persisted across navigation).

### API client

`services/api-client.ts` — Axios instance. Android emulator routes through `10.0.2.2:3000`; iOS/web uses `localhost:3000`.

### UI library

The app uses **Tamagui** (`2.0.0-rc.41`) for layout primitives (`YStack`, `XStack`, `Button`, `Spinner`, `Separator`) and `Avatar`. Plain React Native `StyleSheet` is used for custom styling where Tamagui is not involved.

### Mobile testing patterns

Tests live in `app/delivery-job/__tests__/` and `hooks/`. Key conventions:

- Tamagui components are shimmed with plain `View`/`React.createElement` in `jest.mock("tamagui", ...)`.
- `UNSAFE_getByProps({ id: "..." })` is used to locate elements because shimmed Tamagui components do not support `testID`.
- `use-update-delivery-status` has a **3-second simulated network delay** (`setTimeout(resolve, 3000)`). Tests must call `jest.useFakeTimers()` and `act(() => jest.advanceTimersByTime(3000))` before asserting post-update state. Each `TODO` comment in the test marks this workaround.
- Import test fixtures from `@swift-route/seed-data` (`COURIER_IDS`, `JOB_IDS`, `deliveryJobsStore`).

### Path aliases

`@/` maps to `apps/swift-app/` root. `@swift-route/types` and `@swift-route/seed-data` resolve via Metro config watching the monorepo root.

### Theming

Colors and theme tokens live in `constants/theme.ts`. Use `useThemeColor` hook and `ThemedText`/`ThemedView` primitives. `useColorScheme` has a `.web.ts` platform override.

## Shared Types (`packages/types`)

Package name: `@swift-route/types`. No build step — imported directly from source.

- `src/enums.ts` — `DeliveryStatus` and `PackageType` defined as **`const` objects** (not TypeScript `enum`) to work around a NestJS + TypeScript 5.7 incompatibility. Values: `DeliveryStatus.ASSIGNED`, `IN_TRANSIT`, `DELIVERED`; `PackageType.DOCUMENT`, `PERISHABLE`, `FRAGILE`, `APPLIANCE`, `FURNITURE`.
- `src/index.ts` — public surface; re-exports everything

When adding new shared types, define in `src/` and re-export from `src/index.ts`.

## Shared Seed Data (`packages/seed-data`)

Package name: `@swift-route/seed-data`. No build step — imported directly from source.

Exports `COURIER_IDS`, `JOB_IDS`, `courierStore`, `deliveryNotesStore`, `deliveryJobsStore`. Both the backend (`src/stores/`) and mobile tests import from here to ensure consistent test fixtures.
