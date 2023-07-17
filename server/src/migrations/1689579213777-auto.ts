import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689579213777 implements MigrationInterface {
    name = 'Auto1689579213777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_positions_summary" DROP CONSTRAINT "FK_84449dae27e668e917a355bc265"`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" DROP CONSTRAINT "REL_84449dae27e668e917a355bc26"`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-17T07:33:40.036Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-17T07:33:40.220Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-17 06:57:46.153'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-17 06:57:45.871'`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ADD "project_id" integer`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ADD CONSTRAINT "REL_84449dae27e668e917a355bc26" UNIQUE ("project_id")`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ADD CONSTRAINT "FK_84449dae27e668e917a355bc265" FOREIGN KEY ("project_id") REFERENCES "topvisor_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
