import { element, by } from 'detox';
import { BasePage } from './BasePage';

/**
 * Page Object de la pantalla de área segura (post-login).
 * Mapea los testID definidos en SecureAreaScreen.tsx de la app.
 */
export class SecureAreaScreen extends BasePage {

  // ── Locators ──────────────────────────────────────────────────────────────

  /** Banner verde visible al entrar a la pantalla */
  private successBanner = element(by.id('success-banner'));

  /** Texto dentro del banner de éxito */
  private successText = element(by.id('success-text'));

  /** Título principal de la pantalla */
  private heading = element(by.id('secure-area-heading'));

  /** Botón naranja para cerrar sesión */
  private logoutButton = element(by.id('logout-button'));

  // ── Acciones atómicas ─────────────────────────────────────────────────────

  /** Toca el botón de logout para volver al login */
  async tapLogout() {
    console.log('[SecureAreaScreen] tapLogout → tocando botón logout');
    await this.tapElement(this.logoutButton);
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /** Verifica que la pantalla de área segura cargó correctamente */
  async assertScreenVisible() {
    console.log('[SecureAreaScreen] assertScreenVisible → verificando pantalla cargada');
    await this.waitForVisible(this.heading);
  }

  /** Verifica que el banner de éxito es visible */
  async assertSuccessBannerVisible() {
    console.log('[SecureAreaScreen] assertSuccessBannerVisible → verificando banner de éxito');
    await this.waitForVisible(this.successBanner);
  }

  /** Verifica el texto exacto del banner de éxito */
  async assertSuccessText(expectedText: string) {
    console.log(`[SecureAreaScreen] assertSuccessText → verificando texto: "${expectedText}"`);
    await this.expectText(this.successText, expectedText);
  }
}

export default new SecureAreaScreen();
