# AGENTS.md

## Purpose


This file provides essential instructions and conventions for AI coding agents working in this repository. It is designed to help agents be immediately productive, follow project-specific patterns, and avoid common pitfalls.

**For detailed backend/mobile structure, see [CLAUDE.md](CLAUDE.md). For quickstart and setup, see [README.md](README.md).**

## Project Overview

- **Monorepo managed by pnpm**: Contains a NestJS backend (apps/swift-route), an Expo/React Native mobile app (apps/swift-app), and shared types (packages/types) and seed data (packages/seed-data).
- **Backend**: Standard NestJS module/controller/service pattern. Entry: apps/swift-route/src/main.ts. Uses in-memory data stores (no database) seeded from packages/seed-data. Use pnpm scripts for build/test/lint.
- **Mobile App**: Expo Router, file-based routing in app/. Uses @/ alias for local imports and @swift-route/types for shared types. UI built with Tamagui.
- **Shared Types & Seed Data**: All runtime enums and types are in packages/types. Canonical IDs and test fixtures are in packages/seed-data.

## Domain Model & Data

- **Domain entities**: DeliveryJob, Courier, DeliveryNote (see packages/types/src/index.ts)
- **Seed data**: Canonical IDs and fixtures in packages/seed-data/src/
- **No database**: All data is in-memory arrays, mutated directly by the backend service.

## Key Conventions

- **pnpm** is the only supported package manager. Do not use npm or yarn. Use `pnpm install`, `pnpm start:dev`, etc.
- **NestJS**: Add new features as modules in apps/swift-route/src/, import into AppModule. All data is mutated in-place in the store arrays.
- **Expo Router**: Place screens in app/(tabs)/, use _layout.tsx for navigation structure. Use Tamagui for UI primitives.
- **Shared Types**: Update packages/types/src/enums.ts for enums, re-export from packages/types/src/index.ts. Use only `const` objects for enums (not TypeScript `enum`).
- **Testing**: Use Jest for backend (`pnpm test`), and Expo's test runner for mobile. Backend tests are stateful and ordered; use canonical IDs from seed-data for test cases.

## Troubleshooting & Pitfalls

- Only pnpm is supported—do not use npm or yarn.
- Backend data is not persistent; restarting the server resets all data.
- Android emulator uses `10.0.2.2:3000` for backend API; iOS/web uses `localhost:3000`.
- Tamagui components are shimmed in mobile tests; use `UNSAFE_getByProps` for queries.

## Build & Test Commands

- Install: `pnpm install`
- Backend dev: `pnpm start:dev`
- Backend test: `pnpm test`
- Mobile dev: `pnpm --filter ./apps/swift-app start`
- Lint: `pnpm lint`
- Format: `pnpm format`


## Documentation Roles

- **AGENTS.md**: Quick reference for agent conventions, project boundaries, and troubleshooting.
- **CLAUDE.md**: In-depth backend/mobile architecture, REST API, and test conventions.
- **README.md**: Quickstart, monorepo structure, endpoint summary, and state machine overview.

## Agent Guidance

- Link to existing documentation where possible, do not duplicate.
- Follow the minimal-by-default principle: only include what is not easily discoverable.
- If a convention is unclear, ask for feedback or clarification.
- For backend/mobile specifics, always check CLAUDE.md first.


_Last updated: 2026-04-27_