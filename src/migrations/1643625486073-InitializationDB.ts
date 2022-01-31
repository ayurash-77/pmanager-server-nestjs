import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializationDB1643625486073 implements MigrationInterface {
    name = 'InitializationDB1643625486073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agencies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "altName" character varying, CONSTRAINT "UQ_1ea16c73ecef4bab2f61c31c889" UNIQUE ("name"), CONSTRAINT "PK_8ab1f1f53f56c8255b0d7e68b28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "altName" character varying, CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "briefCategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" integer NOT NULL, "details" character varying, CONSTRAINT "UQ_8a4858230839fd05fa48d4f0328" UNIQUE ("name"), CONSTRAINT "UQ_45c22140b80ad6cd3d4118007ea" UNIQUE ("code"), CONSTRAINT "PK_85b2f8d9a19e6619c7fb5add2ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "details" character varying, CONSTRAINT "UQ_e480da468fa5ef0b9a8f90c438e" UNIQUE ("name"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "details" character varying, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "name" character varying, "surname" character varying, "phone" character varying, "image" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "homeDir" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "startAt" TIMESTAMP WITH TIME ZONE, "deadline" TIMESTAMP WITH TIME ZONE, "doneAt" TIMESTAMP WITH TIME ZONE, "details" character varying, "ownerId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "briefs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "originalName" character varying NOT NULL, "category" character varying NOT NULL DEFAULT 'Common', "approved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "details" character varying, "url" character varying NOT NULL, "projectId" integer, "createdById" integer, "updatedById" integer, CONSTRAINT "UQ_4b7a4ee8f72e0b22a798ccaf967" UNIQUE ("name"), CONSTRAINT "UQ_77ac0ace5685bec970adc9c8972" UNIQUE ("url"), CONSTRAINT "PK_1e3944bfaf5baf0f14b0bc892b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" integer NOT NULL, "details" character varying NOT NULL, CONSTRAINT "UQ_037e43ea842b18ce4e5f4dcfd06" UNIQUE ("name"), CONSTRAINT "UQ_a860e6a2158936bd8216716545d" UNIQUE ("code"), CONSTRAINT "UQ_db390b389652fd4dd711561383f" UNIQUE ("details"), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_jobs" ("rolesId" integer NOT NULL, "jobsId" integer NOT NULL, CONSTRAINT "PK_405570213ef75df15e018b6ade5" PRIMARY KEY ("rolesId", "jobsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cc505c5c5d5ca7f85832da11b" ON "roles_jobs" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8858d4499e95fcd18f4852f569" ON "roles_jobs" ("jobsId") `);
        await queryRunner.query(`CREATE TABLE "users_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_37623035dbbec2f0a4b76ff4000" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_deeb1fe94ce2d111a6695a2880" ON "users_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21db462422f1f97519a29041da" ON "users_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "briefs" ADD CONSTRAINT "FK_4bace1210b6a39a052cacad69c9" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "briefs" ADD CONSTRAINT "FK_24d4be25a14b9892c2dcc9e09ac" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "briefs" ADD CONSTRAINT "FK_894572ab45ce335a6f8d5a60ded" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "briefs" DROP CONSTRAINT "FK_894572ab45ce335a6f8d5a60ded"`);
        await queryRunner.query(`ALTER TABLE "briefs" DROP CONSTRAINT "FK_24d4be25a14b9892c2dcc9e09ac"`);
        await queryRunner.query(`ALTER TABLE "briefs" DROP CONSTRAINT "FK_4bace1210b6a39a052cacad69c9"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21db462422f1f97519a29041da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_deeb1fe94ce2d111a6695a2880"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8858d4499e95fcd18f4852f569"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2cc505c5c5d5ca7f85832da11b"`);
        await queryRunner.query(`DROP TABLE "roles_jobs"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`DROP TABLE "briefs"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TABLE "briefCategory"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "agencies"`);
    }

}
