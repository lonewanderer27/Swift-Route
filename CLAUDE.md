# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Swift Route is a **pnpm monorepo** with two apps:

- `apps/swift-route` — NestJS 11 backend (TypeScript)
- `apps/swift-app` — Expo / React Native mobile app (TypeScript, Expo Router)

The `packages/` directory holds shared packages consumed by both apps:

- `packages/types` — shared TypeScript types and enums (`@swift-route/types`)

## Package Manager

Always use **pnpm**. The workspace is defined in `pnpm-workspace.yaml` with hoisted node linking.

```bash
pnpm install          # install all workspace dependencies
```

## Backend (`apps/swift-route`)

NestJS monorepo managed via the Nest CLI. Entry point: `apps/swift-route/src/main.ts`, listening on `PORT` env var or `3000`.

```bash
# from repo root
pnpm start            # production start
pnpm start:dev        # watch mode (recommended for development)
pnpm start:debug      # debug + watch
pnpm build            # compile via webpack to dist/
pnpm lint             # ESLint with auto-fix
pnpm test             # Jest unit tests (*.spec.ts under apps/)
pnpm test:watch       # Jest in watch mode
pnpm test:cov         # coverage report
pnpm test:e2e         # E2E tests (apps/swift-route/test/jest-e2e.json)
pnpm format           # Prettier format all apps/**/*.ts
```

Run a single test file:
```bash
pnpm test -- apps/swift-route/src/app.controller.spec.ts
```

### NestJS architecture pattern

Follow the standard NestJS module pattern: `*.module.ts` → imports controllers and providers; `*.controller.ts` → route handlers; `*.service.ts` → business logic. Add new feature modules in `apps/swift-route/src/` and import them into `AppModule`.

The `nest-cli.json` defines two NestJS projects: `swift-route` (default) and `swift-backend` (at `apps/swift-backend/` — scaffolded but not yet populated).

## Mobile App (`apps/swift-app`)

Expo SDK 54 + React Native 0.81 using **Expo Router** (file-based routing). Entry is `expo-router/entry` pointing at the `app/` directory.

```bash
# from apps/swift-app or using pnpm --filter
cd apps/swift-app
pnpm start            # Expo dev server (press i/a/w for iOS/Android/web)
pnpm ios              # iOS simulator
pnpm android          # Android emulator
pnpm web              # web browser
pnpm lint             # expo lint (ESLint)
```

### Routing structure

- `app/_layout.tsx` — root Stack navigator, wraps everything with React Navigation `ThemeProvider`
- `app/(tabs)/` — tab group; `_layout.tsx` defines the bottom tab bar
- `app/modal.tsx` — modal screen

### Path aliases

The mobile app uses `@/` mapping to the `apps/swift-app/` root (e.g., `@/components/...`, `@/hooks/...`, `@/constants/...`) and `@swift-route/types` for the shared types package.

### Theming

Colors and theme tokens live in `constants/theme.ts`. Components use `useColorScheme` (with a `.web.ts` platform override) and `useThemeColor` hooks. `ThemedText` and `ThemedView` are the base themed primitives.

## Shared Types (`packages/types`)

Package name: `@swift-route/types`. No build step — source is consumed directly from `src/`. Import in either app:

```ts
import type { DeliveryJob } from '@swift-route/types';
import { DeliveryStatus, PackageType } from '@swift-route/types';
```

- `src/index.ts` — public surface; re-exports all types
- `src/enums.ts` — `DeliveryStatus` (`assigned | in-transit | delivered`) and `PackageType` (`document | perishable | fragile | appliance | furniture`)

When adding new shared types, define them in `src/` and re-export from `src/index.ts`. The path alias `@swift-route/types` is configured in both the root `tsconfig.json` (for NestJS) and `apps/swift-app/tsconfig.json` (for Expo). Metro is configured via `apps/swift-app/metro.config.js` to watch the monorepo root so the package resolves at runtime.
