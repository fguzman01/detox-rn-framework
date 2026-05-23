import { element, by } from 'detox';
import { BasePage } from './BasePage';

/**
 * Page Object de la pantalla de Login.
 * Mapea los testID definidos en LoginScreen.tsx de la app detox-demo.
 */
export class LoginScreen extends BasePage {

  // ── Locators ──────────────────────────────────────────────────────────────

  /** Campo de texto para el nombre de usuario */
  private usernameInput = element(by.id('username-input'));

  /** Campo de texto para la contraseña */
  private passwordInput = element(by.id('password-input'));

  /** Botón de submit del formulario */
  private loginButton = element(by.id('login-button'));

  /** Banner rojo que aparece con credenciales inválidas */
  private errorBanner = element(by.id('error-banner'));

  /** Banner verde que aparece con login exitoso */
  private successBanner = element(by.id('success-banner'));

  // ── Acciones atómicas ─────────────────────────────────────────────────────

  /** Escribe el nombre de usuario en el campo correspondiente */
  async enterUsername(username: string) {
    console.log(`[LoginScreen] enterUsername → "${username}"`);
    await this.typeInElement(this.usernameInput, username);
  }

  /** Escribe la contraseña en el campo correspondiente */
  async enterPassword(password: string) {
    console.log(`[LoginScreen] enterPassword → ingresando contraseña`);
    await this.typeInElement(this.passwordInput, password);
  }

  /** Toca el botón de login */
  async tapLogin() {
    console.log(`[LoginScreen] tapLogin → tocando botón login`);
    await this.tapElement(this.loginButton);
  }

  // ── Acciones compuestas ───────────────────────────────────────────────────

  /** Realiza el flujo completo de login: username + password + tap */
  async loginAs(username: string, password: string) {
    console.log(`[LoginScreen] loginAs → iniciando login con usuario "${username}"`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.tapLogin();
    console.log(`[LoginScreen] loginAs → flujo completado`);
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /** Verifica que el banner de error es visible — espera hasta que aparezca */
  async assertErrorVisible() {
    console.log(`[LoginScreen] assertErrorVisible → verificando banner de error`);
    await this.waitForVisible(this.errorBanner);
  }

  /** Verifica que el banner de éxito es visible — espera hasta que aparezca */
  async assertSuccessVisible() {
    console.log(`[LoginScreen] assertSuccessVisible → verificando banner de éxito`);
    await this.waitForVisible(this.successBanner);
  }

  /** Verifica que el formulario de login está visible en pantalla */
  async assertLoginFormVisible() {
    console.log(`[LoginScreen] assertLoginFormVisible → verificando pantalla cargada`);
    await this.waitForVisible(this.loginButton);
  }
}

// Singleton: una sola instancia compartida entre todos los tests
export default new LoginScreen();
