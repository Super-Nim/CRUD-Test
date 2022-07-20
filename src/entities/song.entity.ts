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
} from 'typeorm'
import { Artist } from './artist.entity'

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @Column({
    type: 'varchar',
    length: '100',
    name: 'title',
    nullable: false,
  })
  songTitle: string

  @Column({
    type: 'varchar',
    length: '100',
    name: 'fileUrl',
    nullable: false,
  })
  songFileUrl: string

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

  @ManyToMany(() => Artist, (artist) => artist.songs)
  @JoinTable()
  artists: Artist[]
}
