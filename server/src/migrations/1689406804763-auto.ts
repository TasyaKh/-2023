import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689406804763 implements MigrationInterface {
    name = 'Auto1689406804763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "y_metrics" ADD "index" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T07:40:10.007Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T07:40:10.078Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 05:41:32.961'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 05:41:32.864'`);
        await queryRunner.query(`ALTER TABLE "y_metrics" DROP COLUMN "index"`);
    }

}
