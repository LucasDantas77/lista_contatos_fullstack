import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1685036763372 implements MigrationInterface {
    name = 'initialMigrate1685036763372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "fone" numeric NOT NULL, "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contatos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(45) NOT NULL, "fone" numeric NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_994cdcb2c56dfb5b66217c854cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_db1ed6d13afe6b6184cc72bb906" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_db1ed6d13afe6b6184cc72bb906"`);
        await queryRunner.query(`DROP TABLE "contatos"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
