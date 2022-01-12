if (process.env.NODE_ENV == 'env-prod') {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as colors from 'colors';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

const mode = process.env.NODE_ENV.toUpperCase().split('-')[1];
if (process.env.NODE_ENV == 'env-dev') {
  console.log(colors.red(mode), 'mode');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() //
    .setTitle('PP18 PManager server')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}

bootstrap().then(() => {
  console.log(colors.blue(`Server ready on port: ${PORT}`), '::', colors.red(mode), 'mode');
});
