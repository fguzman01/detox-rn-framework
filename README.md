# detox-rn-framework

E2E testing framework for React Native using Detox.

## Stack
- Framework: Detox 20.50.4
- Language: TypeScript
- Runner: Jest
- Platform: Android (iOS via CI/CD)
- CI/CD: GitHub Actions
- Device Farm: LambdaTest HyperExecute (in progress)

## Architecture
e2e/
├── screens/          # Page Objects (one class per screen)
│   ├── BasePage.ts   # Base class with reusable Detox helpers
│   ├── LoginScreen.ts
│   └── SecureAreaScreen.ts
├── flows/            # Reusable flows between tests
│   └── authFlow.ts
├── data/             # JSON test data + providers
│   ├── credentials.json
│   └── CredentialsProvider.ts
├── tests/            # Test specs
│   └── login.test.ts
└── utils/            # Generic helpers (pending)

## Test Scenarios
| Test | Description |
|------|-------------|
| login exitoso con credenciales válidas | Login with valid user, assert success banner |
| login fallido con credenciales inválidas | Login with invalid user, assert error banner |
| login fallido con credenciales vacías | Login with empty fields, assert error banner |
| ciclo completo login y logout | Login → SecureArea → Logout → assert form visible |

## Local Setup

### Prerequisites
- Node.js 22+
- JDK 17
- Android Studio + AVD (Pixel 7 Pro, API 33)
- Android emulator running

### Environment variables
Copy `.env.example` to `.env` and fill in your values:
APK_PATH=      # absolute path to app-debug.apk
AVD_NAME=      # your AVD name (e.g. Pixel_7_Pro)
DETOX_CONFIGURATION=android.emu.debug

### Run tests locally
```bash
# Terminal 1 - start Metro bundler (from detox-demo folder)
cd ../detox-demo && npm start

# Terminal 2 - run tests
npm run test:android
```

### Available scripts
| Script | Description |
|--------|-------------|
| `npm run test:android` | Run all tests |
| `npm run test:android:debug` | Run with verbose logs |
| `npm run test:smoke` | Run smoke tests only |
| `npm run build:android` | Rebuild the APK |

## CI/CD

### GitHub Actions — Android E2E (active)
Runs on every push to main using ubuntu-latest with Android emulator.

Key fixes applied for CI:
- `libpulse0` installed for emulator audio compatibility
- KVM enabled for hardware acceleration
- `adb reverse tcp:8081` for Metro bundler connectivity
- `pixel_5` profile name (lowercase) for AVD creation

### LambdaTest HyperExecute (in progress)
Integration with real Android devices via HyperExecute CLI.
Status: device allocation configuration pending.

## App Under Test
Using [detox-demo](https://github.com/tjmaher/detox-demo) as the target app.
testIDs available: username-input, password-input, login-button, error-banner, success-banner, secure-area-heading, logout-button.
