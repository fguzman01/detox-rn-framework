import LoginScreen from '../screens/LoginScreen';
import SecureAreaScreen from '../screens/SecureAreaScreen';
import { Credentials } from '../data/CredentialsProvider';

/**
 * Flujos y assertions reutilizables de autenticación.
 * Cubre el ciclo completo: login → secure area → logout.
 */
class AuthFlow {

  // ── Flujos ────────────────────────────────────────────────────────────────

  /**
   * Ejecuta el flujo completo de login con las credenciales recibidas.
   * No hace ninguna assertion — eso es responsabilidad del test.
   */
  async login(credentials: Credentials) {
    console.log(`[AuthFlow] login → ejecutando login con usuario "${credentials.username}"`);
    await LoginScreen.assertLoginFormVisible();
    await LoginScreen.loginAs(credentials.username, credentials.password);
    console.log('[AuthFlow] login → flujo de login completado');
  }

  /**
   * Ejecuta logout desde la pantalla de área segura.
   * No hace ninguna assertion — eso es responsabilidad del test.
   */
  async logout() {
    console.log('[AuthFlow] logout → ejecutando logout');
    await SecureAreaScreen.assertScreenVisible();
    await SecureAreaScreen.tapLogout();
    console.log('[AuthFlow] logout → flujo de logout completado');
  }

  /**
   * Flujo completo: login → navega a secure area → logout.
   * Reutilizable para tests que necesitan el ciclo completo.
   */
  async loginAndLogout(credentials: Credentials) {
    console.log('[AuthFlow] loginAndLogout → iniciando ciclo completo');
    await this.login(credentials);
    await this.assertSecureAreaVisible();
    await this.logout();
    await this.assertLoginSuccess();
    console.log('[AuthFlow] loginAndLogout → ciclo completo finalizado ✓');
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /** Verifica que el login fue exitoso — banner de éxito en login visible */
  async assertLoginSuccess() {
    console.log('[AuthFlow] assertLoginSuccess → verificando login exitoso');
    await LoginScreen.assertSuccessVisible();
    console.log('[AuthFlow] assertLoginSuccess → assertion pasada ✓');
  }

  /** Verifica que el login falló — banner de error visible */
  async assertLoginError() {
    console.log('[AuthFlow] assertLoginError → verificando error de login');
    await LoginScreen.assertErrorVisible();
    console.log('[AuthFlow] assertLoginError → assertion pasada ✓');
  }

  /** Verifica que la pantalla de área segura está visible */
  async assertSecureAreaVisible() {
    console.log('[AuthFlow] assertSecureAreaVisible → verificando secure area');
    await SecureAreaScreen.assertScreenVisible();
    await SecureAreaScreen.assertSuccessBannerVisible();
    console.log('[AuthFlow] assertSecureAreaVisible → assertion pasada ✓');
  }

  /** Verifica que el formulario de login está visible en pantalla */
  async assertLoginFormVisible() {
    console.log('[AuthFlow] assertLoginFormVisible → verificando formulario de login');
    await LoginScreen.assertLoginFormVisible();
    console.log('[AuthFlow] assertLoginFormVisible → assertion pasada ✓');
  }
}

export default new AuthFlow();
