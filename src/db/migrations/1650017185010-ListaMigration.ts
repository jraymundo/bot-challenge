import {MigrationInterface, QueryRunner} from "typeorm";

export class ListaMigration1650017185010 implements MigrationInterface {
    name = 'ListaMigration1650017185010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bots" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, "purpose" text NOT NULL, "avatar" text, CONSTRAINT "PK_8b1b0180229dec2cbfdf5e776e4" PRIMARY KEY ("id")); COMMENT ON COLUMN "bots"."id" IS 'Primary Key'`);
        await queryRunner.query(`ALTER TABLE "bots" ADD CONSTRAINT "FK_5da286413177d0a20e7f1a4731f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bots" DROP CONSTRAINT "FK_5da286413177d0a20e7f1a4731f"`);
        await queryRunner.query(`DROP TABLE "bots"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
