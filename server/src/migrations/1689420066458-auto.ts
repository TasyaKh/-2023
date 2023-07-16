import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689420066458 implements MigrationInterface {
    name = 'Auto1689420066458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "y_data" DROP CONSTRAINT "FK_5548456a7021b5578e2504398dd"`);
        await queryRunner.query(`CREATE TABLE "y_query" ("id" SERIAL NOT NULL, "totals" text NOT NULL, "type_dimention" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_4ad50cfae2e8f8238d0638591cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "y_metrics" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "y_data" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "y_data" DROP COLUMN "type_dimention"`);
        await queryRunner.query(`ALTER TABLE "y_data" ADD "query_id" integer`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T11:21:12.579Z"'`);
        await queryRunner.query(`ALTER TABLE "y_metrics" ALTER COLUMN "index" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T11:21:12.721Z"'`);
        await queryRunner.query(`ALTER TABLE "y_query" ADD CONSTRAINT "FK_0a9f6c4576e1b75e08f6114e6cb" FOREIGN KEY ("project_id") REFERENCES "yandex_project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "y_data" ADD CONSTRAINT "FK_660eb9f2cda8fe8511f7a0607df" FOREIGN KEY ("query_id") REFERENCES "y_query"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "y_data" DROP CONSTRAINT "FK_660eb9f2cda8fe8511f7a0607df"`);
        await queryRunner.query(`ALTER TABLE "y_query" DROP CONSTRAINT "FK_0a9f6c4576e1b75e08f6114e6cb"`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 07:40:10.078'`);
        await queryRunner.query(`ALTER TABLE "y_metrics" ALTER COLUMN "index" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 07:40:10.007'`);
        await queryRunner.query(`ALTER TABLE "y_data" DROP COLUMN "query_id"`);
        await queryRunner.query(`ALTER TABLE "y_data" ADD "type_dimention" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "y_data" ADD "project_id" integer`);
        await queryRunner.query(`ALTER TABLE "y_metrics" ADD "project_id" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "y_query"`);
        await queryRunner.query(`ALTER TABLE "y_data" ADD CONSTRAINT "FK_5548456a7021b5578e2504398dd" FOREIGN KEY ("project_id") REFERENCES "yandex_project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
