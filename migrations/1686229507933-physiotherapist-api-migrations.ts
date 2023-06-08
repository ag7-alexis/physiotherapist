import { MigrationInterface, QueryRunner } from "typeorm";

export class PhysiotherapistApiMigrations1686229507933 implements MigrationInterface {
    name = 'PhysiotherapistApiMigrations1686229507933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP CONSTRAINT "UQ_4113c92a29f7471f1febf78ea50"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_social_security_number"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" DROP COLUMN "pt_latitude_address"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" ADD "pt_latitude_address" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_pt" DROP COLUMN "pt_longitude_address"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" ADD "pt_longitude_address" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_latitude_address"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_latitude_address" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_longitude_address"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_longitude_address" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_longitude_address"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_longitude_address" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_latitude_address"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_latitude_address" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_pt" DROP COLUMN "pt_longitude_address"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" ADD "pt_longitude_address" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_pt" DROP COLUMN "pt_latitude_address"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" ADD "pt_latitude_address" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_social_security_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD CONSTRAINT "UQ_4113c92a29f7471f1febf78ea50" UNIQUE ("pr_social_security_number")`);
    }

}
