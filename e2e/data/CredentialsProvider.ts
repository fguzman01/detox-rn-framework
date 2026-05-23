import rawData from './credentials.json';

/**
 * Tipo que representa un par de credenciales de usuario.
 */
export interface Credentials {
  username: string;
  password: string;
}

/**
 * Data Provider para credenciales de login.
 * Centraliza el acceso a los datos de prueba.
 * Los tests nunca importan el JSON directamente.
 */
class CredentialsProvider {

  /** Retorna credenciales de un usuario válido */
  validUser(): Credentials {
    console.log('[CredentialsProvider] validUser → retornando credenciales válidas');
    return rawData.validUser;
  }

  /** Retorna credenciales de un usuario inválido */
  invalidUser(): Credentials {
    console.log('[CredentialsProvider] invalidUser → retornando credenciales inválidas');
    return rawData.invalidUser;
  }

  /** Retorna credenciales vacías para validar campos requeridos */
  emptyUser(): Credentials {
    console.log('[CredentialsProvider] emptyUser → retornando credenciales vacías');
    return rawData.emptyUser;
  }
}

export default new CredentialsProvider();
