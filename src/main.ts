import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix("api");
  const swaggerConfig = new DocumentBuilder()
    .setTitle("API with NestJS")
    .setDescription("API developed throughout the API with NestJS course")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  const applicationPort = process.env.PORT ? process.env.PORT : 9090;
  await app.listen(applicationPort);
}

bootstrap();
