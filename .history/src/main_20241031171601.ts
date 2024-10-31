import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { envs } from "./config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (
    AppModule, {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  );

  const looger = new Logger('ProductsMS-main');

  //app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(envports.);
  looger.log("PRODUCTS-MICROSERVICE ACTIVATE");
}
bootstrap();
