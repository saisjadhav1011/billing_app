import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775882929630 implements MigrationInterface {
    name = 'Migration1775882929630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_blocked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_blocked"`);
    }

}
