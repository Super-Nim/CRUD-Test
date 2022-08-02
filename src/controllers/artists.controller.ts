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
  Delete,
} from "@nestjs/common";

import { ArtistService } from "../services/artist.service";
import { Artist } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("artist")
@ApiTags("Artist")
export class ArtistsController {
  constructor(
    private artistService: ArtistService,
    private artistRepository: ArtistRepository
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Fetch all artists", description: "Fetches all artists, unfiltered"})
  @ApiResponse({ status: 200, description: "Artists successfully fetched" })
  async findAll(@Query() query) {
    return await this.artistService.getAll(query);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Fetch an artist", description: "Fetches an artist by its id"})
  @ApiResponse({ status: 200, description: "Artist successfully fetched" })
  async findById(@Param("id") id: number) {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return artist;
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update an artist", description: "Updates an artist by its id"})
  @ApiResponse({ status: 200, description: "Artist successfully updated" })
  async update(@Param("id") id: number, @Body() patchData: Artist) {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    const updatedArtist = await this.artistService.update(artist, patchData);
    return { data: updatedArtist, message: "Artist updated" };
  }

  @Post("")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Add an artist", description: "Adds an artist by its id"})
  @ApiResponse({ status: 200, description: "Artist successfully deleted" })
  async create(@Body() postData: Artist) {
    await this.artistService.create(postData);
    return { message: "Artist Successfully added" };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete an artist", description: "Deletes an artist by its id"})
  @ApiResponse({ status: 200, description: "Artist successfully deleted" })
  async delete(@Param("id") id: number) {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new NotFoundException("Artist not found")
    }
    await this.artistService.delete(id);
    return { message: "Artist successfully deleted"};
  }
}
