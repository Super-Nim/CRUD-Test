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
  async findAll(@Req() req: Request, @Res() res: Response) {
    const list = await this.songService.getAll(req.query);
    return res.status(HttpStatus.OK).send(list);
  }
  @Get(":id")
  async findById(@Param("id") id: string, @Res() res: Response) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }
    return res.status(HttpStatus.OK).send(song);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() patchData: Song,
    @Res() res: Response
  ) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }
    await this.songService.update(song, patchData);
    res.status(HttpStatus.OK).send({ message: "Song successfully updated" });
    return;
  }

  @Post("")
  async create(@Body() postData: Song, @Res() res: Response) {
    await this.songService.create(postData);
    res.status(HttpStatus.OK).send({ message: "Song successfully added" });
    return;
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException("Song not found");
    }

    await this.songService.delete(parseInt(id));
    res.status(HttpStatus.OK).send({ message: "Song successfully deleted" });
    return;
  }
}
