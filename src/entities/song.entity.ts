import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Artist } from "./artist.entity";

@Entity()
export class Song extends BaseEntity {
  @ApiProperty({
    deprecated: true,
  })
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @ApiProperty({
    deprecated: true,
  })
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({
    type: "varchar",
    length: "100",
    name: "title",
    nullable: false,
  })
  songTitle: string;

  @Column({
    type: "varchar",
    length: "100",
    name: "fileUrl",
    nullable: false,
  })
  songFileUrl: string;

  @Column("text", { nullable: true })
  description: string;

  @ApiProperty({
    deprecated: true,
  })
  @Column({ nullable: false, default: 0, name: "is_deleted" })
  isDeleted: boolean;

  @ApiProperty({
    deprecated: true,
  })
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  public createdAt: Date;

  @ApiProperty({
    deprecated: true,
  })
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  public updatedAt: Date;

  @ManyToMany(() => Artist, (artist) => artist.songs)
  @JoinTable()
  @ApiProperty({
    example: "[]",
  })
  artists: Artist[];
}
