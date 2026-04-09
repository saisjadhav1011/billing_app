import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775705328461 implements MigrationInterface {
    name = 'Migration1775705328461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refresh_token" text`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b5effca691499d21c5ec683ced6" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b5effca691499d21c5ec683ced6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_by"`);
    }

}
