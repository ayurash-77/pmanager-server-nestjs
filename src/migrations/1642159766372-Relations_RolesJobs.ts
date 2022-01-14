import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationsRolesJobs1642159766372 implements MigrationInterface {
  name = 'RelationsRolesJobs1642159766372'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "FK_40d48a84cc304dbd899965df6ad"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "FK_fbcdf9d0832cb285642e850434e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_40d48a84cc304dbd899965df6a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fbcdf9d0832cb285642e850434"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "PK_dce08ad2c24b4afb137fef82bcb"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "PK_fbcdf9d0832cb285642e850434e" PRIMARY KEY ("jobId")`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP COLUMN "roleId"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "PK_fbcdf9d0832cb285642e850434e"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP COLUMN "jobId"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD "rolesId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "PK_2cc505c5c5d5ca7f85832da11b7" PRIMARY KEY ("rolesId")`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD "jobsId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "PK_2cc505c5c5d5ca7f85832da11b7"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "PK_405570213ef75df15e018b6ade5" PRIMARY KEY ("rolesId", "jobsId")`);
    await queryRunner.query(`CREATE INDEX "IDX_2cc505c5c5d5ca7f85832da11b" ON "roles_jobs" ("rolesId") `);
    await queryRunner.query(`CREATE INDEX "IDX_8858d4499e95fcd18f4852f569" ON "roles_jobs" ("jobsId") `);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "FK_2cc505c5c5d5ca7f85832da11b7" FOREIGN KEY ("rolesId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "FK_8858d4499e95fcd18f4852f569c" FOREIGN KEY ("jobsId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "FK_8858d4499e95fcd18f4852f569c"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "FK_2cc505c5c5d5ca7f85832da11b7"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8858d4499e95fcd18f4852f569"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2cc505c5c5d5ca7f85832da11b"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "PK_405570213ef75df15e018b6ade5"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "PK_2cc505c5c5d5ca7f85832da11b7" PRIMARY KEY ("rolesId")`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP COLUMN "jobsId"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "PK_2cc505c5c5d5ca7f85832da11b7"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP COLUMN "rolesId"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD "jobId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "PK_fbcdf9d0832cb285642e850434e" PRIMARY KEY ("jobId")`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD "roleId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        DROP CONSTRAINT "PK_fbcdf9d0832cb285642e850434e"`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "PK_dce08ad2c24b4afb137fef82bcb" PRIMARY KEY ("roleId", "jobId")`);
    await queryRunner.query(`CREATE INDEX "IDX_fbcdf9d0832cb285642e850434" ON "roles_jobs" ("jobId") `);
    await queryRunner.query(`CREATE INDEX "IDX_40d48a84cc304dbd899965df6a" ON "roles_jobs" ("roleId") `);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "FK_fbcdf9d0832cb285642e850434e" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "roles_jobs"
        ADD CONSTRAINT "FK_40d48a84cc304dbd899965df6ad" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

}
