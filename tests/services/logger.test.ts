import { Logger } from '../../src/services/Logger';
import { OBJECT_LOGGER } from './mocks/logger.mock';

describe("LoggerService", () => {
    it("Para de generar un logger basico", () => {
      // Generar un logger y verificar que no es nulo o indefinido
      const logger = Logger.getLogger('::TEST | mensaje de log de testeo');
      expect(logger).toBeDefined();
      expect(logger).not.toBeNull();
  
      // el objeto de logger generado debe de ser el esperado      
      expect(logger).toMatchObject(OBJECT_LOGGER);
    });
  
    it("Para iniciar el logger correctamente sin errores", () => {
      expect(() => { Logger.initLogger(); }).not.toThrowError();
    });
  });