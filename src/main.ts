import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configure, getLogger } from 'log4js';
import { mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();


  /**
   * make a several directory, just in case it is a fresh install.
   */
  try {
    mkdirSync('./log');
  } catch (e) {
    if (e.code !== 'EEXIST') {
      process.exit(1);
    }
  }

  configure('log4js_config.json');
  const logger = getLogger('main');
  logger.info('Started.  Listening on port' + app.get('ConfigService').envConfig.PORT + '.');

  const options = new DocumentBuilder()
    .setTitle('Free Leagues')
    .setDescription('API for Free Leagues')
    .setVersion('1.0')
    .addTag('leagues')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(app.get('ConfigService').envConfig.PORT);
}
bootstrap();
