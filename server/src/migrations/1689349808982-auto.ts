import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689349808982 implements MigrationInterface {
    name = 'Auto1689349808982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "all" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "up" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "stay" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "down" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "1_10" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "11_30" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "31_50" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "51_100" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "101_10000" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-14T15:50:14.246Z"'`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ALTER COLUMN "avgs" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ALTER COLUMN "avg_dynamic" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ALTER COLUMN "visibility_dynamic" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-14T15:50:14.293Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-14 15:18:01.66'`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ALTER COLUMN "visibility_dynamic" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ALTER COLUMN "avg_dynamic" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_positions_summary" ALTER COLUMN "avgs" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-14 15:18:01.541'`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "101_10000" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "51_100" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "31_50" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "11_30" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_tops" ALTER COLUMN "1_10" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "down" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "stay" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "up" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_dynamics" ALTER COLUMN "all" SET NOT NULL`);
    }

}
