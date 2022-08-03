// import * as fs from 'fs';
// import { path as appPath } from 'app-root-path';

if (process.env.NODE_ENV == 'env-prod') {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as colors from 'colors';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 4001;

const mode = process.env.NODE_ENV.toUpperCase().split('-')[1];
if (process.env.NODE_ENV == 'env-dev') {
  console.log(colors.yellow(`Server starting...`), '::', colors.red(mode), 'mode');
}

async function bootstrap() {
  // const httpsOptions = {
  //   cert: fs.readFileSync(`${appPath}/secrets/certificate1.pem`),
  //   key: fs.readFileSync(`${appPath}/secrets/certificate1_key.pem`),
  // };
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
    cors: true,
    logger: ['error', 'warn'],
  });

  const config = new DocumentBuilder() //
    .setTitle('PP18 PManager server')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(PORT);
}

bootstrap().then(() => {
  console.log(colors.green(`Server ready on port: ${PORT}`), '::', colors.red(mode), 'mode');
});
