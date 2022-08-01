import {
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Song } from "./song.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Artist extends BaseEntity {
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
    length: "50",
    name: "name",
    nullable: false,
  })
  artistName: string;
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
  @ApiProperty({
    deprecated: true,
  })
  @ManyToMany(() => Song, (song) => song.artists)
  @JoinTable()
  @ApiProperty({
    example: "[]",
  })
  songs: Song[];
}
