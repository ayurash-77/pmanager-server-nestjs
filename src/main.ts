import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;
console.log(`➜ Server starting at port: ${PORT}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap().then(() => {
  console.log(`➜ Server ready at port: ${PORT}`);
});
