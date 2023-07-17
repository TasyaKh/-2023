import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689347875917 implements MigrationInterface {
    name = 'Auto1689347875917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "y_data" ("id" SERIAL NOT NULL, "project_id" integer NOT NULL, "name" character varying NOT NULL, "favicon" character varying, "type_dimention" character varying NOT NULL, CONSTRAINT "PK_d97b39435e58e852d47c453dca4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "y_metrics" ("id" SERIAL NOT NULL, "project_id" integer NOT NULL, "metric" integer NOT NULL, "date" TIMESTAMP NOT NULL, "data_id" integer, CONSTRAINT "PK_9e0c8e2a8f431c1e33a357c7e95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ADD "date_last_update" TIMESTAMP NOT NULL DEFAULT '"2023-07-14T15:18:01.541Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ADD "date_last_update" TIMESTAMP NOT NULL DEFAULT '"2023-07-14T15:18:01.660Z"'`);
        await queryRunner.query(`ALTER TABLE "y_metrics" ADD CONSTRAINT "FK_f0545b830e1f46442e67569f11d" FOREIGN KEY ("data_id") REFERENCES "y_data"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "y_metrics" DROP CONSTRAINT "FK_f0545b830e1f46442e67569f11d"`);
        await queryRunner.query(`ALTER TABLE "yandex_project" DROP COLUMN "date_last_update"`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" DROP COLUMN "date_last_update"`);
        await queryRunner.query(`DROP TABLE "y_metrics"`);
        await queryRunner.query(`DROP TABLE "y_data"`);
    }

}
