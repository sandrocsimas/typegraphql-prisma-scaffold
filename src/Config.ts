import * as dotenv from 'dotenv';
import { Service } from 'typedi';

dotenv.config();

@Service()
class Config {
  public env: string = this.getProperty('APP_ENV', 'development');

  public port: number = this.getProperty('APP_PORT', 3000);

  public debug: boolean = this.getProperty('APP_DEBUG', false);

  public jwtSecret: string = this.getRequiredProperty('JWT_SECRET');

  private getProperty(name: string, defaultValue: any): any {
    return process.env[name] ?? defaultValue;
  }

  private getRequiredProperty(name: string): any {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Property "${name}" is required`);
    }
    return value;
  }
}

export default Config;
