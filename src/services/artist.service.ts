import { Injectable } from '@nestjs/common'
import { ArtistRepository } from '../repositories/artist.repository'

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

  create(req: any) {
    try {
      return this.artistRepository.save(req)
    } catch (error) {
      throw error
    }
  }

  async getAll(query: any): Promise<any> {
    return await this.artistRepository.findAll(query)
  }

  async getById(id: number) {
    return await this.artistRepository.findOne(id)
  }

  async update(
    id: number,
    updateParams: { artistName: string; description: string },
  ) {
    try {
      return await this.artistRepository.update(id, updateParams)
    } catch (error) {
      throw error
    }
  }
}
