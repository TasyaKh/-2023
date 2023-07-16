import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689428382563 implements MigrationInterface {
    name = 'Auto1689428382563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topvisor_project" ADD "regions" text NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T13:39:50.773Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T13:39:50.929Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 12:37:55.895'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-15 12:37:55.99'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" DROP COLUMN "regions"`);
    }

}
