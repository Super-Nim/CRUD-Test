import { EntityRepository, QueryBuilder, Repository } from "typeorm";
import { Artist } from "../entities/artist.entity";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {
  async queryBuilder() {
    return this.createQueryBuilder("artist");
  }

  async findAll(filters: {
    name?: string;
    isDeleted?: boolean;
    page: number;
    perPage: number;
  }) {
    const builder = await this.queryBuilder();
    builder.select(["artist.id", "artist.uuid", "artist.artistName"]);
    // LEFT JOIN artist's songs property
    builder.leftJoinAndSelect("artist.songs", "songs");

    if (filters.name) {
      builder.where("artist.name = :name", {
        name: filters.name,
      });
    }

    if (filters.isDeleted) {
      builder.andWhere("song.is_deleted =:isDeleted", {
        isDeleted: filters.isDeleted,
      });
    }

    const [data, count] = await builder
      .skip(
        ((filters.page ? filters.page : 1) - 1) *
          (filters.perPage ? filters.perPage : 10)
      )
      .orderBy("artist.created_at", "DESC")
      .take(filters.perPage)
      .getManyAndCount();

    return {
      data,
      count,
    };
  }

  async findById(id: number) {
    const builder = await this.queryBuilder();

    builder.select(["artist.id", "artist.uuid", "artist.artistName"]);

    builder.leftJoinAndSelect("artist.songs", "song");

    const data = await builder.where("artist.id =:id", { id: id }).getOne();

    return data;
  }
}
