import { device } from 'detox';
import { expect as jestExpect } from '@jest/globals';
import AuthFlow from '../flows/authFlow';
import CredentialsProvider from '../data/CredentialsProvider';

describe('Login', () => {

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    const testName = jestExpect.getState().currentTestName ?? 'unknown';
    if (jestExpect.getState().assertionCalls === 0) {
      await device.takeScreenshot(`FAILED_${testName}`);
    }
  });

  it('login exitoso con credenciales válidas', async () => {
    await AuthFlow.login(CredentialsProvider.validUser());
    await AuthFlow.assertLoginSuccess();
  });

  it('login fallido con credenciales inválidas', async () => {
    await AuthFlow.login(CredentialsProvider.invalidUser());
    await AuthFlow.assertLoginError();
  });

  it('login fallido con credenciales vacías', async () => {
    await AuthFlow.login(CredentialsProvider.emptyUser());
    await AuthFlow.assertLoginError();
  });

});
