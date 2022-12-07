import * as dotenv from 'dotenv';

dotenv.config();

class Config {
  public env: string = Config.getProperty('APP_ENV', 'development');

  public port: number = Config.getProperty('APP_PORT', 3000);

  public debug: boolean = Config.getProperty('APP_DEBUG', false);

  public databaseUrl: string = Config.getRequiredProperty('DATABASE_URL');

  public isDevelopment(): boolean {
    return this.env === 'development';
  }

  private static getProperty(name: string, defaultValue: any): any {
    return process.env[name] ?? defaultValue;
  }

  private static getRequiredProperty(name: string): any {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Property "${name}" is required`);
    }
    return value;
  }
}

export default new Config();
