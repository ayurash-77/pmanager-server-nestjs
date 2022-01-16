import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializationDB1642330264531 implements MigrationInterface {
    name = 'InitializationDB1642330264531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("name" character varying NOT NULL, "details" character varying, "id" SERIAL NOT NULL, CONSTRAINT "UQ_e480da468fa5ef0b9a8f90c438e" UNIQUE ("name"), CONSTRAINT "UQ_e480da468fa5ef0b9a8f90c438e" UNIQUE ("name"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("name" character varying NOT NULL, "details" character varying, "id" SERIAL NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("name" character varying NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "name" character varying, "surname" character varying, "phone" character varying, "image" character varying, "id" SERIAL NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_jobs" ("rolesId" integer NOT NULL, "jobsId" integer NOT NULL, CONSTRAINT "PK_405570213ef75df15e018b6ade5" PRIMARY KEY ("rolesId", "jobsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cc505c5c5d5ca7f85832da11b" ON "roles_jobs" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8858d4499e95fcd18f4852f569" ON "roles_jobs" ("jobsId") `);
        await queryRunner.query(`CREATE TABLE "users_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_37623035dbbec2f0a4b76ff4000" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_deeb1fe94ce2d111a6695a2880" ON "users_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21db462422f1f97519a29041da" ON "users_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "roles_jobs" ADD CONSTRAINT "FK_2cc505c5c5d5ca7f85832da11b7" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_jobs" ADD CONSTRAINT "FK_8858d4499e95fcd18f4852f569c" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_deeb1fe94ce2d111a6695a2880e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_21db462422f1f97519a29041da0" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_21db462422f1f97519a29041da0"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_deeb1fe94ce2d111a6695a2880e"`);
        await queryRunner.query(`ALTER TABLE "roles_jobs" DROP CONSTRAINT "FK_8858d4499e95fcd18f4852f569c"`);
        await queryRunner.query(`ALTER TABLE "roles_jobs" DROP CONSTRAINT "FK_2cc505c5c5d5ca7f85832da11b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21db462422f1f97519a29041da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_deeb1fe94ce2d111a6695a2880"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8858d4499e95fcd18f4852f569"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2cc505c5c5d5ca7f85832da11b"`);
        await queryRunner.query(`DROP TABLE "roles_jobs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
