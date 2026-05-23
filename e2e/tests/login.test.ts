import { device } from 'detox';
import LoginScreen from '../screens/LoginScreen';
import credentials from '../data/credentials.json';

describe('Login - smoke', () => {

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await LoginScreen.assertLoginFormVisible();
  });

  it('login exitoso con credenciales válidas', async () => {
    await LoginScreen.loginAs(
      credentials.validUser.username,
      credentials.validUser.password
    );
    await LoginScreen.assertSuccessVisible();
  });

  it('login fallido con credenciales inválidas', async () => {
    await LoginScreen.loginAs(
      credentials.invalidUser.username,
      credentials.invalidUser.password
    );
    await LoginScreen.assertErrorVisible();
  });

});
