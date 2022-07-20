import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  app.setGlobalPrefix('api')

  const applicationPort = process.env.PORT ? process.env.PORT : 9090
  await app.listen(applicationPort)
}

bootstrap()
