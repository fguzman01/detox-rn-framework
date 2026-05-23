# Convenciones del framework

## Logs y comentarios
- Cada método público lleva un `console.log` al inicio con el formato:
  `[NombreClase] nombreMetodo → descripción breve`
- Si el método recibe un valor relevante (texto, url, nombre) se imprime en el log
- Passwords nunca se imprimen, solo se indica "ingresando contraseña"
- Cada método público lleva un comentario JSDoc de una línea explicando qué hace
- Los bloques de métodos se agrupan con separadores de sección: Locators, Acciones atómicas, Acciones compuestas, Assertions

## Page Objects (screens/)
- Extienden BasePage
- Locators son propiedades privadas, nunca inline en los métodos
- Cada locator tiene un comentario de una línea indicando qué elemento representa
- Se exporta como singleton: `export default new NombreScreen()`
- Nombre de archivo: PascalCase + sufijo Screen (ej: LoginScreen.ts)

## Tests (tests/)
- Un archivo por feature (ej: login.test.ts)
- Usan el singleton del Page Object, nunca instancian con new
- lifecycle: beforeAll lanza la app, beforeEach recarga RN, afterEach screenshot si falla
- Nombre del test en español describiendo el escenario real del usuario

## Data (data/)
- Archivos JSON por feature (ej: credentials.json)
- Sin datos hardcodeados en tests ni en Page Objects

## Utils (utils/)
- Funciones puras sin estado
- Nombre descriptivo del archivo (ej: fileHelpers.ts, dateHelpers.ts)

## TypeScript
- strict: false (compatibilidad con tipos de Detox)
- Tipos de Detox via ReturnType<typeof element> en BasePage
- No usar any salvo casos excepcionales documentados con comentario
