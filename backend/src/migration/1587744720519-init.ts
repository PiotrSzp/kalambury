import {MigrationInterface, QueryRunner} from "typeorm";

export class init1587744720519 implements MigrationInterface {
    name = 'init1587744720519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(300) NOT NULL, "roomId" uuid, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(30) NOT NULL, "pin" character varying(4) NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "value" character varying(300) NOT NULL, "roomId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_145fea442eb4b687dbc6ebbefe3" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_6bae746b677b590645dbe841b7e" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_6bae746b677b590645dbe841b7e"`, undefined);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_145fea442eb4b687dbc6ebbefe3"`, undefined);
        await queryRunner.query(`DROP TABLE "card"`, undefined);
        await queryRunner.query(`DROP TABLE "room"`, undefined);
        await queryRunner.query(`DROP TABLE "player"`, undefined);
    }

}
