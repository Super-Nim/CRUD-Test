import { EntityRepository, QueryBuilder, Repository } from 'typeorm'
import { Artist } from '../entities/artist.entity'

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {
  async queryBuilder() {
    return this.createQueryBuilder('artist')
  }

  async findAll(filters: {
    name?: string
    isDeleted?: boolean
    page: number
    perPage: number
  }) {
    const builder = await this.queryBuilder()
    builder.select(['artist.id', 'artist.uuid', 'artist.artistName'])
    if (filters.name) {
      builder.where('artist.name = :name', {
        name: filters.name,
      })
    }
    const [data, count] = await builder
      .skip(
        ((filters.page ? filters.page : 1) - 1) *
          (filters.perPage ? filters.perPage : 10),
      )
      .orderBy('artist.created_at', 'DESC')
      .take(filters.perPage)
      .getManyAndCount()

    return {
      data,
      count,
    }
  }
}
