import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689655847198 implements MigrationInterface {
    name = 'Auto1689655847198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_tops" DROP CONSTRAINT "FK_3c52d176fafea54f39e1c5607a0"`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-18T04:50:55.857Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-18T04:50:56.142Z"'`);
        await queryRunner.query(`ALTER TABLE "t_tops" ADD CONSTRAINT "FK_3c52d176fafea54f39e1c5607a0" FOREIGN KEY ("positions_summary_id") REFERENCES "t_positions_summary"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_tops" DROP CONSTRAINT "FK_3c52d176fafea54f39e1c5607a0"`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-17 07:33:40.22'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-17 07:33:40.036'`);
        await queryRunner.query(`ALTER TABLE "t_tops" ADD CONSTRAINT "FK_3c52d176fafea54f39e1c5607a0" FOREIGN KEY ("positions_summary_id") REFERENCES "t_positions_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
