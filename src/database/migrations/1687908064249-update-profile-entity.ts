import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProfileEntity1687908064249 implements MigrationInterface {
    name = 'updateProfileEntity1687908064249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "fiscalCode"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "shippingAddress"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_d80b94dc62f7467403009d88062" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_d80b94dc62f7467403009d88062"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "shippingAddress" character varying`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "phoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "fiscalCode" character varying`);
    }

}
