import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689399684443 implements MigrationInterface {
    name = 'Auto1689399684443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T05:41:32.864Z"'`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '"2023-07-15T05:41:32.961Z"'`);
        await queryRunner.query(`ALTER TABLE "y_data" ALTER COLUMN "project_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "y_data" ADD CONSTRAINT "FK_5548456a7021b5578e2504398dd" FOREIGN KEY ("project_id") REFERENCES "yandex_project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "y_data" DROP CONSTRAINT "FK_5548456a7021b5578e2504398dd"`);
        await queryRunner.query(`ALTER TABLE "y_data" ALTER COLUMN "project_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "yandex_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-14 15:50:14.293'`);
        await queryRunner.query(`ALTER TABLE "topvisor_project" ALTER COLUMN "date_last_update" SET DEFAULT '2023-07-14 15:50:14.246'`);
    }

}
