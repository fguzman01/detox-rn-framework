import { element, waitFor, expect, device } from 'detox';

// Tipo inferido directamente desde la función element() de Detox
type DetoxElement = ReturnType<typeof element>;

/**
 * Clase base abstracta para todos los Page Objects.
 * Centraliza los helpers de Detox para que cada Screen no repita lógica.
 * Nunca se instancia directamente — siempre se extiende.
 */
export abstract class BasePage {

  /**
   * Espera hasta que el elemento sea visible en pantalla.
   * Usar antes de cualquier interacción para evitar errores de timing.
   */
  async waitForVisible(elem: DetoxElement, timeout = 5000) {
    console.log(`[BasePage] waitForVisible → esperando elemento visible (timeout: ${timeout}ms)`);
    await waitFor(elem)
      .toBeVisible()
      .withTimeout(timeout);
    console.log(`[BasePage] waitForVisible → elemento visible ✓`);
  }

  /**
   * Espera hasta que el elemento desaparezca de pantalla.
   * Útil para verificar que un loader o modal se cerró.
   */
  async waitForNotVisible(elem: DetoxElement, timeout = 5000) {
    console.log(`[BasePage] waitForNotVisible → esperando que elemento desaparezca (timeout: ${timeout}ms)`);
    await waitFor(elem)
      .not.toBeVisible()
      .withTimeout(timeout);
    console.log(`[BasePage] waitForNotVisible → elemento no visible ✓`);
  }

  /**
   * Toca un elemento. Espera que sea visible antes de tocar.
   */
  async tapElement(elem: DetoxElement) {
    console.log(`[BasePage] tapElement → esperando visibilidad y tocando elemento`);
    await this.waitForVisible(elem);
    await elem.tap();
    console.log(`[BasePage] tapElement → tap ejecutado ✓`);
  }

  /**
   * Toca un campo y escribe texto usando replaceText (atómico, no dispara onChangeText por carácter).
   * Espera visibilidad antes de interactuar.
   */
  async typeInElement(elem: DetoxElement, text: string) {
    console.log(`[BasePage] typeInElement → escribiendo "${text}"`);
    await this.waitForVisible(elem);
    await elem.replaceText(text);
    console.log(`[BasePage] typeInElement → texto ingresado ✓`);
  }

  /**
   * Limpia el contenido actual de un campo y escribe texto nuevo.
   * Usar cuando el campo puede tener texto previo.
   */
  async clearAndType(elem: DetoxElement, text: string) {
    console.log(`[BasePage] clearAndType → limpiando campo y escribiendo "${text}"`);
    await this.waitForVisible(elem);
    await elem.clearText();
    await elem.replaceText(text);
    console.log(`[BasePage] clearAndType → campo limpio y texto ingresado ✓`);
  }

  /**
   * Assertion: verifica que el elemento es visible en pantalla.
   */
  async expectVisible(elem: DetoxElement) {
    console.log(`[BasePage] expectVisible → verificando que elemento es visible`);
    await expect(elem).toBeVisible();
    console.log(`[BasePage] expectVisible → assertion pasada ✓`);
  }

  /**
   * Assertion: verifica que el elemento NO es visible en pantalla.
   */
  async expectNotVisible(elem: DetoxElement) {
    console.log(`[BasePage] expectNotVisible → verificando que elemento no es visible`);
    await expect(elem).not.toBeVisible();
    console.log(`[BasePage] expectNotVisible → assertion pasada ✓`);
  }

  /**
   * Assertion: verifica que el elemento tiene el texto exacto esperado.
   */
  async expectText(elem: DetoxElement, text: string) {
    console.log(`[BasePage] expectText → verificando texto esperado: "${text}"`);
    await expect(elem).toHaveText(text);
    console.log(`[BasePage] expectText → assertion pasada ✓`);
  }

  /**
   * Toma un screenshot nombrado. Se guarda en la carpeta artifacts/.
   * Usar en pasos clave del flujo o en el afterEach cuando falla un test.
   */
  async takeScreenshot(name: string) {
    console.log(`[BasePage] takeScreenshot → capturando screenshot: "${name}"`);
    await device.takeScreenshot(name);
    console.log(`[BasePage] takeScreenshot → screenshot guardado ✓`);
  }
}
