import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  Res,
  NotFoundException,
  HttpCode,
  Query,
} from "@nestjs/common";

import { SongService } from "../services/song.service";
import { Request, Response } from "express";
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
  async findById(@Param("id") id: string) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }
    return song;
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: string, @Body() patchData: Song) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }
    await this.songService.update(song, patchData);
    return { message: "Song successfully updated" };
  }

  @Post("")
  @HttpCode(HttpStatus.OK)
  async create(@Body() postData: Song) {
    await this.songService.create(postData);
    return { message: "Song successfully added" };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string, @Res() res: Response) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }

    await this.songService.delete(parseInt(id));
    return { message: "Song successfully deleted" };
  }
}
