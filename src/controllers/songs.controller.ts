import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  NotFoundException,
  HttpCode,
  Query,
} from "@nestjs/common";

import { SongService } from "../services/song.service";
import { Song } from "../entities/song.entity";
import { SongRepository } from "../repositories/song.repository";
import { ApiTags } from "@nestjs/swagger";

@Controller("songs")
@ApiTags("Songs")
export class SongsController {
  constructor(
    private songService: SongService,
    private songRepository: SongRepository
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query) {
    return await this.songService.getAll(query);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id") id: number) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }
    return song;
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: number, @Body() patchData: Song) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }
    const updatedSong = await this.songService.update(song, patchData);
    return { data: updatedSong, message: "Song successfully updated" };
  }

  @Post("")
  @HttpCode(HttpStatus.OK)
  async create(@Body() postData: Song) {
    await this.songService.create(postData);
    return { message: "Song successfully added" };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: number) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }

    await this.songService.delete(id);
    return { message: "Song successfully deleted" };
  }
}
