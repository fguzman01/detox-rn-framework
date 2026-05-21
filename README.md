# detox-rn-framework

E2E testing framework for React Native using Detox.

## Stack
- Framework: Detox
- Language: TypeScript
- Runner: Jest
- Platform: Android (iOS via CI/CD)

## Structure
- e2e/screens/ — Page Objects (one class per screen)
- e2e/tests/   — Test specs
- e2e/flows/   — Reusable flows between tests
- e2e/data/    — JSON test data
- e2e/utils/   — Generic helpers
