import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1642106153020 implements MigrationInterface {
  name = 'CreateTables1642106153020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "jobs" ("name" character varying NOT NULL, "details" character varying, "id" SERIAL NOT NULL, CONSTRAINT "UQ_e480da468fa5ef0b9a8f90c438e" UNIQUE ("name"), CONSTRAINT "UQ_e480da468fa5ef0b9a8f90c438e" UNIQUE ("name"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("name" character varying NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "surname" character varying, "phone" character varying, "image" character varying, "id" SERIAL NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
  }
}
