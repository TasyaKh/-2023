import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689252582934 implements MigrationInterface {
    name = 'Auto1689252582934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "t_dynamics" ("id" SERIAL NOT NULL, "id_project" integer NOT NULL, "all" integer NOT NULL, "up" integer NOT NULL, "stay" integer NOT NULL, "down" integer NOT NULL, CONSTRAINT "PK_6a731f62b6c8672a15c86227aa6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_tops" ("id" SERIAL NOT NULL, "1_10" integer NOT NULL, "11_30" integer NOT NULL, "31_50" integer NOT NULL, "51_100" integer NOT NULL, "101_10000" integer NOT NULL, "positions_summary_id" integer, CONSTRAINT "PK_111ec200f9c442b4064f297bcbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topvisor_project" ("id" integer NOT NULL, "name" character varying NOT NULL, "site" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "ps_id" integer, CONSTRAINT "REL_e4304a7907ffe73ad10dd93993" UNIQUE ("ps_id"), CONSTRAINT "PK_752866afd99c6540138b2a4e44e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_positions_summary" ("id" SERIAL NOT NULL, "id_project" integer NOT NULL, "avgs" text NOT NULL, "avg_dynamic" integer NOT NULL, "visibility_dynamic" integer NOT NULL, "dynamics_id" integer, "project_id" integer, CONSTRAINT "REL_af100fc6e96c8d5c4f46d10d2e" UNIQUE ("dynamics_id"), CONSTRAINT "REL_84449dae27e668e917a355bc26" UNIQUE ("project_id"), CONSTRAINT "PK_1a6299635af7c8a043a87700f78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "yandex_project" ("id" integer NOT NULL, "name" character varying NOT NULL, "site" character varying NOT NULL, "create_time" TIMESTAMP NOT NULL, CONSTRAINT "PK_4c24c4f934818c5c065e08ac384" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "t_tops" ADD CONSTRAINT "FK_3c52d176fafea54f39e1c5607a0" FOREIGN KEY ("positions_summary_id") REFERENCES "t_positions_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ADD CONSTRAINT "FK_e4304a7907ffe73ad10dd939933" FOREIGN KEY ("ps_id") REFERENCES "t_positions_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ADD CONSTRAINT "FK_af100fc6e96c8d5c4f46d10d2e9" FOREIGN KEY ("dynamics_id") REFERENCES "t_dynamics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ADD CONSTRAINT "FK_84449dae27e668e917a355bc265" FOREIGN KEY ("project_id") REFERENCES "topvisor_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_positions_summary" DROP CONSTRAINT "FK_84449dae27e668e917a355bc265"`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" DROP CONSTRAINT "FK_af100fc6e96c8d5c4f46d10d2e9"`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" DROP CONSTRAINT "FK_e4304a7907ffe73ad10dd939933"`);
        await queryRunner.query(`ALTER TABLE "t_tops" DROP CONSTRAINT "FK_3c52d176fafea54f39e1c5607a0"`);
        await queryRunner.query(`DROP TABLE "yandex_project"`);
        await queryRunner.query(`DROP TABLE "t_positions_summary"`);
        await queryRunner.query(`DROP TABLE "topvisor_project"`);
        await queryRunner.query(`DROP TABLE "t_tops"`);
        await queryRunner.query(`DROP TABLE "t_dynamics"`);
    }

}
