import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  // Validación a nivel global, exclusivo para los DTO's
  app.useGlobalPipes(
    new ValidationPipe({
       whitelist: true,
       forbidNonWhitelisted: true,
    }),
  )

  await app.listen(3000);
}
main();
