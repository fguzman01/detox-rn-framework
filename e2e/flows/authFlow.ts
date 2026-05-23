import LoginScreen from '../screens/LoginScreen';
import { Credentials } from '../data/CredentialsProvider';

/**
 * Flujos y assertions reutilizables de autenticación.
 * Un solo flujo de login genérico + assertions separadas.
 * El test decide qué credentials usar y qué assertion verificar.
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

  // ── Assertions ────────────────────────────────────────────────────────────

  /** Verifica que el login fue exitoso — banner de éxito visible */
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
}

export default new AuthFlow();
