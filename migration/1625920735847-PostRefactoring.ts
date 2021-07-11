import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1625920735847 implements MigrationInterface {
  // eslint-disable-next-line prettier/prettier
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "columns" json, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "boardId" uuid NOT NULL, "columnId" uuid, "userId" uuid, "description" character varying NOT NULL, "title" character varying, "order" integer NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "login", "password") VALUES (DEFAULT, 'admin', 'admin', '$2b$10$g0W27CN5.m9Hubl3JlStMuSpvM2Sb0bIw0EjKGrvtqZ5ZIGtyFB9S')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "boards"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
