import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689424670091 implements MigrationInterface {
    name = 'Auto1689424670091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T12:37:55.895Z"'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T12:37:55.990Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 11:21:12.579'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 11:21:12.721'`);
    }

}
