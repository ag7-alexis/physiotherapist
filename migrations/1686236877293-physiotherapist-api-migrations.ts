import { MigrationInterface, QueryRunner } from "typeorm";

export class PhysiotherapistApiMigrations1686236877293 implements MigrationInterface {
    name = 'PhysiotherapistApiMigrations1686236877293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_f" ("f_id" SERIAL NOT NULL, "f_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "f_path" character varying NOT NULL, "f_url" character varying NOT NULL, "f_category" character varying NOT NULL, "f_relation_uuid" character varying NOT NULL, "f_creation_date" TIMESTAMP NOT NULL DEFAULT now(), "f_update_date" TIMESTAMP NOT NULL DEFAULT now(), "f_deleted" TIMESTAMP, CONSTRAINT "UQ_e7f01b762e007b3460e818ca0a9" UNIQUE ("f_uuid"), CONSTRAINT "PK_44ab14b00f140d0b30306d7f19f" PRIMARY KEY ("f_id"))`);
        await queryRunner.query(`ALTER TABLE "patient_pt" ADD "pt_picture_file_uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD "pr_picture_file_uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicalprescription_mpn" ADD "mpn_prescription_picture_file_uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_pt" ADD CONSTRAINT "FK_547e603d7651cedc183ba386961" FOREIGN KEY ("pt_picture_file_uuid") REFERENCES "file_f"("f_uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" ADD CONSTRAINT "FK_a065b179fa30427b4a70d7845b6" FOREIGN KEY ("pr_picture_file_uuid") REFERENCES "file_f"("f_uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicalprescription_mpn" ADD CONSTRAINT "FK_3e8a7d9cd930b33bee885d31f41" FOREIGN KEY ("mpn_prescription_picture_file_uuid") REFERENCES "file_f"("f_uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicalprescription_mpn" DROP CONSTRAINT "FK_3e8a7d9cd930b33bee885d31f41"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP CONSTRAINT "FK_a065b179fa30427b4a70d7845b6"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" DROP CONSTRAINT "FK_547e603d7651cedc183ba386961"`);
        await queryRunner.query(`ALTER TABLE "medicalprescription_mpn" DROP COLUMN "mpn_prescription_picture_file_uuid"`);
        await queryRunner.query(`ALTER TABLE "practitioner_pr" DROP COLUMN "pr_picture_file_uuid"`);
        await queryRunner.query(`ALTER TABLE "patient_pt" DROP COLUMN "pt_picture_file_uuid"`);
        await queryRunner.query(`DROP TABLE "file_f"`);
    }

}
