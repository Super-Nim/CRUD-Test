import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import * as dotenv from 'dotenv'
import { TypeOrmModule } from '@nestjs/typeorm'

dotenv.config()

import { AppController } from './controllers/app.controller'
import { HealthChkController } from './controllers/healthchk.controller'
import { AppService } from './services/app.service'
import { HealthChkService } from './services/healthchk.service'
import { typeOrmConfig } from './config/typeorm.config'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forRoot(typeOrmConfig),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV == 'production'
          ? {}
          : {
              prettyPrint: {
                colorize: true,
                levelFirst: true,
              },
            },
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [HealthChkController],
  providers: [HealthChkService],
  exports: [],
})
export class AppModule {}
