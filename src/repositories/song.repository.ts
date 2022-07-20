import { EntityRepository, QueryBuilder, Repository } from 'typeorm'
import { Song } from '../entities/song.entity'

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {
  async queryBuilder() {
    return this.createQueryBuilder('song')
  }

  async findAll(filters: {
    title?: string
    isDeleted?: boolean
    artist?: number
    type?: string
    page: number
    perPage: number
  }) {
    const builder = await this.queryBuilder()

    builder.select([
      'song.id',
      'song.uuid',
      'song.songTitle',
      'song.songFileUrl',
      'song.description',
    ])

    builder.leftJoinAndSelect('song.artists', 'artist')

    if (filters.title) {
      builder.where('song.title = :title', {
        title: filters.title,
      })
    }

    if (filters.isDeleted) {
      builder.andWhere('song.is_deleted =:isDeleted', {
        isDeleted: filters.isDeleted,
      })
    }

    const [data, count] = await builder
      .skip(
        ((filters.page ? filters.page : 1) - 1) *
          (filters.perPage ? filters.perPage : 10),
      )
      .orderBy('song.id', 'DESC')
      .take(filters.perPage)
      .getManyAndCount()

    return {
      data,
      count,
    }
  }
}
