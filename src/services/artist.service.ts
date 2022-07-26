import { Injectable } from "@nestjs/common";
import { Artist } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

  create(postData: Artist) {
    try {
      return this.artistRepository.save(postData);
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
    id: number,
    updateParams: { artistName: string; description: string }
  ) {
    try {
      return await this.artistRepository.update(id, updateParams);
    } catch (error) {
      throw error;
    }
  }
}
