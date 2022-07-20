import {MigrationInterface, QueryRunner} from "typeorm";

export class createSongArtistEntity1658351846522 implements MigrationInterface {
    name = 'createSongArtistEntity1658351846522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "fileUrl" character varying(100) NOT NULL, "description" text, "is_deleted" boolean NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text, "is_deleted" boolean NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song_artists_artist" ("songId" bigint NOT NULL, "artistId" bigint NOT NULL, CONSTRAINT "PK_38fe81fb5fd7ff1e938ab214522" PRIMARY KEY ("songId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_444e236ce5cc51e9117fdc4b5b" ON "song_artists_artist" ("songId") `);
        await queryRunner.query(`CREATE INDEX "IDX_94917f0a503ce27772bae20e43" ON "song_artists_artist" ("artistId") `);
        await queryRunner.query(`ALTER TABLE "song_artists_artist" ADD CONSTRAINT "FK_444e236ce5cc51e9117fdc4b5b2" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "song_artists_artist" ADD CONSTRAINT "FK_94917f0a503ce27772bae20e430" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_artists_artist" DROP CONSTRAINT "FK_94917f0a503ce27772bae20e430"`);
        await queryRunner.query(`ALTER TABLE "song_artists_artist" DROP CONSTRAINT "FK_444e236ce5cc51e9117fdc4b5b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94917f0a503ce27772bae20e43"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_444e236ce5cc51e9117fdc4b5b"`);
        await queryRunner.query(`DROP TABLE "song_artists_artist"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "song"`);
    }

}
