import { Injectable } from '@nestjs/common'
import { Song } from '../entities/song.entity'
import { ArtistRepository } from '../repositories/artist.repository'
import { SongRepository } from '../repositories/song.repository'

@Injectable()
export class SongService {
  constructor(
    private songRepository: SongRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async create(req: any) {
    try {
      const song = new Song()
      song.songTitle = req.songTitle
      song.description = req.description
      song.songFileUrl = req.songFileUrl
      const artistCollection = []

      if (req.artist) {
        for (let i = 0; i < req.artist.length; i++) {
          const artist = await this.artistRepository.findOne(req.artist[i])
          if (artist) {
            artistCollection.push(artist)
          }
        }
      }
      song.artists = artistCollection

      return await song.save()
    } catch (error) {
      throw error
    }
  }

  async getAll(query: any): Promise<any> {
    return await this.songRepository.findAll(query)
  }

  async getById(id: number) {
    return await this.songRepository.findOne(id)
  }

  async update(
    song: Song,
    updateParams: {
      songTitle?: string
      description?: string
      songFileUrl?: string
      artist?: []
    },
  ) {
    try {
      if (updateParams.songTitle) {
        song.songTitle = updateParams.songTitle
      }
      if (updateParams.description) {
        song.description = updateParams.description
      }
      if (updateParams.songFileUrl) {
        song.songFileUrl = updateParams.songFileUrl
      }

      if (updateParams.artist) {
        const artistCollection = []
        for (let i = 0; i < updateParams.artist.length; i++) {
          const artist = await this.artistRepository.findOne(
            updateParams.artist[i],
          )
          if (artist) {
            artistCollection.push(artist)
          }
        }
        song.artists = artistCollection
      }
      return await song.save()
    } catch (error) {
      throw error
    }
  }

  async delete(id: number) {
    try {
      await this.songRepository.delete(id)
    } catch (error) {
      throw error
    }
  }
}
