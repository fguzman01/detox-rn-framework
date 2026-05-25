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
      testBinaryPath: process.env.TEST_APK_PATH,
    },
    'android.lt': {
      type: 'android.apk',
      binaryPath: process.env.APK_PATH,
      testBinaryPath: process.env.TEST_APK_PATH,
    },
  },
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: process.env.AVD_NAME,
      },
    },
    lambdatest: {
      type: 'android.attached',
      device: {
        adbName: process.env.LT_ADB_NAME ?? 'emulator-5554',
      },
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.lt.debug': {
      device: 'lambdatest',
      app: 'android.lt',
    },
  },
};
