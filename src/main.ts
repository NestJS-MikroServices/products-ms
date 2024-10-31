import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { envs } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const looger = new Logger('ProductsMS-main');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(envs.port);
  looger.log("APP ACTIVATE");
}
bootstrap();
