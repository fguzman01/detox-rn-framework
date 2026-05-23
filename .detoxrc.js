require('dotenv').config();

/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      config: 'e2e/jest.config.js',
      testTimeout: 120000,
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: process.env.APK_PATH,
    },
  },
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: process.env.AVD_NAME,
      },
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};
