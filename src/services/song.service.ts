import { Injectable } from "@nestjs/common";
import { Artist } from "src/entities/artist.entity";
import { Song } from "../entities/song.entity";
import { ArtistRepository } from "../repositories/artist.repository";
import { SongRepository } from "../repositories/song.repository";

@Injectable()
export class SongService {
  constructor(
    private songRepository: SongRepository,
    private artistRepository: ArtistRepository
  ) {}

  async create(req: Song) {
    try {
      const song = new Song();
      song.songTitle = req.songTitle;
      song.description = req.description;
      song.songFileUrl = req.songFileUrl;
      const artistCollection: Artist[] = [];

      if (req.artists) {
        await Promise.all(
          req.artists.map(async (artist) => {
            const artistObj = await this.artistRepository.findOne(artist);
            if (artistObj) {
              artistCollection.push(artistObj);
            }
            return artistCollection;
          })
        );
      }
      song.artists = artistCollection;

      return await song.save();
    } catch (error) {
      throw error;
    }
  }

  async getAll(query: any) {
    return await this.songRepository.findAll(query);
  }

  async getById(id: number): Promise<Song> {
    return await this.songRepository.findOne(id);
  }

  async update(
    song: Song,
    updateParams: {
      songTitle?: string;
      description?: string;
      songFileUrl?: string;
      artists?: Artist[];
    }
  ) {
    try {
      if (updateParams.songTitle) {
        song.songTitle = updateParams.songTitle;
      }
      if (updateParams.description) {
        song.description = updateParams.description;
      }
      if (updateParams.songFileUrl) {
        song.songFileUrl = updateParams.songFileUrl;
      }
      const artistCollection: Artist[] = [];

      if (updateParams.artists) {
        await Promise.all(
          updateParams.artists.map(async (artist) => {
            const artistObj = await this.artistRepository.findOne(artist);
            if (artistObj) {
              artistCollection.push(artistObj);
            }
            return artistCollection;
          })
        );
      }
      song.artists = artistCollection;
      return await song.save();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await this.songRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
