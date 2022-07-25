import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  NotFoundException,
  Query,
  HttpCode,
} from "@nestjs/common";

import { ArtistService } from "../services/artist.service";
import { Artist } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";
import { ApiTags } from "@nestjs/swagger";

@Controller("artist")
@ApiTags("Artist")
export class ArtistsController {
  constructor(
    private artistService: ArtistService,
    private artistRepository: ArtistRepository
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query) {
    return await this.artistService.getAll(query);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id") id: number) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return artist;
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: number, @Body() patchData: Artist) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    const updatedArtist = await this.artistService.update(+id, patchData);
    return { data: updatedArtist, message: "Artist updated" };
  }

  @Post("")
  @HttpCode(HttpStatus.OK)
  async create(@Body() postData: Artist) {
    await this.artistService.create(postData);
    return { message: "Artist Successfully added" };
  }
}
