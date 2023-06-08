import { MigrationInterface, QueryRunner } from "typeorm";

export class PhysiotherapistApiMigrations1686229017891 implements MigrationInterface {
    name = 'PhysiotherapistApiMigrations1686229017891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP CONSTRAINT "UQ_4113c92a29f7471f1febf78ea50"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_social_security_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_social_security_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD CONSTRAINT "UQ_4113c92a29f7471f1febf78ea50" UNIQUE ("pr_social_security_number")`);
    }

}
