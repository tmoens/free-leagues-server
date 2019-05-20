import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService implements TypeOrmOptionsFactory {
  private readonly envConfig: EnvConfig;
  readonly environment: string;

  constructor() {
    this.environment = process.env.NODE_ENV;

    if (null == this.environment) {
      this.environment = 'production';
    }

    const filePath = `environments/${this.environment}.env`;
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3003),
      DB_NAME: Joi.string().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),

      TYPEORM_SYNCH_DATABASE: Joi.boolean().default(false),
      TYPEORM_LOG_QUERIES: Joi.boolean().default(false),

    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get typeORMLogQueries(): boolean {
    return Boolean(this.envConfig.TYPEORM_LOG_QUERIES);
  }

  // This is used to build ORM configuration options
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const SOURCE_PATH = this.environment === 'production' ? 'dist' : 'src';

    if (this.typeORMLogQueries) {
      return {
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: this.envConfig.DB_USER,
        password: this.envConfig.DB_PASSWORD,
        database: this.envConfig.DB_NAME,
        entities: [
          `${SOURCE_PATH}/**/*.entity{.ts,.js}`,
        ],
        synchronize: false,
        logging: ['error', 'query'],
      };
    } else {
      return {
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: this.envConfig.DB_USER,
        password: this.envConfig.DB_PASSWORD,
        database: this.envConfig.DB_NAME,
        entities: [
          `${SOURCE_PATH}/**/*.entity{.ts,.js}`,
        ],
        synchronize: false,
        logging: ['error', 'query'],
      };

    }
  }
}