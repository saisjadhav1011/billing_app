import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775015312463 implements MigrationInterface {
    name = 'Migration1775015312463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_unittype_enum" AS ENUM('COUNT', 'WEIGHT', 'VOLUME', 'LENGTH')`);
        await queryRunner.query(`CREATE TYPE "public"."product_unit_enum" AS ENUM('PIECE', 'BOX', 'PACK', 'DOZEN', 'KG', 'GRAM', 'LITER', 'ML', 'METER', 'FEET', 'INCH')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "unitType" "public"."product_unittype_enum" NOT NULL, "unit" "public"."product_unit_enum" NOT NULL, "tax" numeric(5,2) NOT NULL DEFAULT '0', "hsn_code" character varying, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_unit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_unittype_enum"`);
    }

}
