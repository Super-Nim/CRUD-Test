import { Injectable } from "@nestjs/common";
import { Song } from "src/entities/song.entity";
import { SongRepository } from "src/repositories/song.repository";
import { Artist } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository, private songRepository: SongRepository) {}

  async create(req: Artist) {
    try {
      const artist = new Artist();
      artist.artistName = req.artistName;
      artist.description = req.description;
      const songCollection: Song[] = [];
      // if song ids have been inputted
      if (req.songs) {
        // wait for all of the songs to be queried
        await Promise.all(
          // map through each song id
          req.songs.map(async (song) => {
            const songObj = await this.songRepository.findOne(song);
            console.log('SONGOBJ: ', songObj);
            // if song exists, push into songCollection
            if (songObj) {
              songCollection.push(songObj);
            }
            return songCollection;
          })
        )
      }
      // assign songs property
      artist.songs = songCollection;

      return await artist.save();
    } catch (error) {
      throw error;
    }
  }

  async getAll(query: {
    name?: string;
    isDeleted?: boolean;
    page: number;
    perPage: number;
  }): Promise<any> {
    return await this.artistRepository.findAll(query);
  }

  async getById(id: number) {
    return await this.artistRepository.findOne(id);
  }

  async update(
    artist: Artist,
    updateParams: { artistName?: string; description?: string, songs?: Song[] }
  ) {
    try {

      if (updateParams.artistName) {
        artist.artistName = updateParams.artistName;
      }
      if (updateParams.description) {
        artist.description = updateParams.description;
      }
      const songCollection: Song[] = [];

      if (updateParams.songs) {
        // wait for all of the songs to be queried
        await Promise.all(
          // map through each song id
          updateParams.songs.map(async (song) => {
            const songObj = await this.songRepository.findOne(song);
            // if song exists, push into songCollection
            if (songObj) {
              songCollection.push(songObj);
            }
            return songCollection;
          })
        )
      }
      artist.songs = songCollection;
      return await artist.save();
    } catch (error) {
      throw error;
    }
  }

  async delete(
    id: number
  ) {
    try {
     await this.artistRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
