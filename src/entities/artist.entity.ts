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
} from 'typeorm'
import { Song } from './song.entity'

@Entity()
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @Column({
    type: 'varchar',
    length: '50',
    name: 'name',
    nullable: false,
  })
  artistName: string

  @Column('text', { nullable: true })
  description: string

  @Column({ nullable: false, default: 0, name: 'is_deleted' })
  isDeleted: boolean

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public updatedAt: Date

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[]
}
