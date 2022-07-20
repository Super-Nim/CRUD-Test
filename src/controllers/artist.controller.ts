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

import { ArtistService } from "../services/artist.service";
import { Request, Response } from "express";
import { Artist } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";
import { ApiTags } from "@nestjs/swagger";

@Controller("artist")
@ApiTags("Artist")
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private artistRepository: ArtistRepository
  ) {}

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const list = await this.artistService.getAll(req.query);
    return res.status(200).send(list);
  }

  @Get(":id")
  async findById(@Param("id") id: string, @Res() res: Response) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return res.status(200).send(artist);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() patchData: Artist,
    @Res() res: Response
  ) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    await this.artistService.update(+id, patchData);
    res.status(200).send({ message: "Artist updated" });
    return;
  }

  @Post("")
  async create(@Body() postData: Artist, @Res() res: Response) {
    await this.artistService.create(postData);
    res.status(200).send({ message: "Artist Successfully added" });
    return;
  }
}
