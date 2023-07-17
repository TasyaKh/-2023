import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689568860159 implements MigrationInterface {
    name = 'Auto1689568860159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "t_positions_data" ("id" SERIAL NOT NULL, "dpr" character varying NOT NULL, "position" character varying NOT NULL, "keyword_id" integer, CONSTRAINT "PK_29cf937694531cc1b49e0334188" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_region" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "index" character varying NOT NULL, "device_name" character varying NOT NULL, "lang" character varying NOT NULL, "searcher_id" integer, CONSTRAINT "PK_0339f70c48b2e835becdc0570d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_searcher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "header_id" integer, CONSTRAINT "PK_c20dfcda09c39e22ea45404fcc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_header" ("id" SERIAL NOT NULL, "dates" text NOT NULL, "result_id" integer, CONSTRAINT "PK_72c6c2175185827d04389fdf178" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_result" ("id" SERIAL NOT NULL, "project_id" integer, CONSTRAINT "PK_84d10210494d72945ab1a6cfefd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_keywords" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "result_id" integer, CONSTRAINT "PK_6970af66ac47e0f5b8f5dd12e4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-17T04:41:10.039Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-17T04:41:10.320Z"'`);
        await queryRunner.query(`ALTER TABLE "t_positions_data" ADD CONSTRAINT "FK_7a5663be83b3b2d33158a6b2d48" FOREIGN KEY ("keyword_id") REFERENCES "t_keywords"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_region" ADD CONSTRAINT "FK_731d04a329ec5b1ca6c580bd940" FOREIGN KEY ("searcher_id") REFERENCES "t_searcher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_searcher" ADD CONSTRAINT "FK_b13c1cbc0cb273d7feeaaab0524" FOREIGN KEY ("header_id") REFERENCES "t_header"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_header" ADD CONSTRAINT "FK_b4aa4592d9bdd1e225698d231c9" FOREIGN KEY ("result_id") REFERENCES "t_result"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_result" ADD CONSTRAINT "FK_c1acd9edac2bb2722d09ec5eb29" FOREIGN KEY ("project_id") REFERENCES "topvisor_project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_keywords" ADD CONSTRAINT "FK_130d2b57705c6b1d36f71ac4335" FOREIGN KEY ("result_id") REFERENCES "t_result"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_keywords" DROP CONSTRAINT "FK_130d2b57705c6b1d36f71ac4335"`);
        await queryRunner.query(`ALTER TABLE "t_result" DROP CONSTRAINT "FK_c1acd9edac2bb2722d09ec5eb29"`);
        await queryRunner.query(`ALTER TABLE "t_header" DROP CONSTRAINT "FK_b4aa4592d9bdd1e225698d231c9"`);
        await queryRunner.query(`ALTER TABLE "t_searcher" DROP CONSTRAINT "FK_b13c1cbc0cb273d7feeaaab0524"`);
        await queryRunner.query(`ALTER TABLE "t_region" DROP CONSTRAINT "FK_731d04a329ec5b1ca6c580bd940"`);
        await queryRunner.query(`ALTER TABLE "t_positions_data" DROP CONSTRAINT "FK_7a5663be83b3b2d33158a6b2d48"`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 13:39:50.929'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 13:39:50.773'`);
        await queryRunner.query(`DROP TABLE "t_keywords"`);
        await queryRunner.query(`DROP TABLE "t_result"`);
        await queryRunner.query(`DROP TABLE "t_header"`);
        await queryRunner.query(`DROP TABLE "t_searcher"`);
        await queryRunner.query(`DROP TABLE "t_region"`);
        await queryRunner.query(`DROP TABLE "t_positions_data"`);
    }

}
