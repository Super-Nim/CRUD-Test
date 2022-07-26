import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import * as dotenv from "dotenv";
import { TypeOrmModule } from "@nestjs/typeorm";

dotenv.config();

import { AppController } from "./controllers/app.controller";
import { HealthChkController } from "./controllers/healthchk.controller";
import { AppService } from "./services/app.service";
import { HealthChkService } from "./services/healthchk.service";
import { typeOrmConfig } from "./config/typeorm.config";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Song } from "./entities/song.entity";
import { Artist } from "./entities/artist.entity";
import { ArtistsController } from "./controllers/artists.controller";
import { ArtistService } from "./services/artist.service";
import { ArtistRepository } from "./repositories/artist.repository";
import { SongRepository } from "./repositories/song.repository";
import { SongsController } from "./controllers/songs.controller";
import { SongService } from "./services/song.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Song, Artist, ArtistRepository, SongRepository]),
    TypeOrmModule.forRoot(typeOrmConfig),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV == "production"
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
  controllers: [
    HealthChkController,
    AppController,
    ArtistsController,
    SongsController,
  ],
  providers: [HealthChkService, AppService, ArtistService, SongService],
  exports: [],
})
export class AppModule {}
