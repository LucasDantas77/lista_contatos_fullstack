"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMigrate1685036763372 = void 0;
class initialMigrate1685036763372 {
    constructor() {
        this.name = 'initialMigrate1685036763372';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "fone" numeric NOT NULL, "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "contatos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(45) NOT NULL, "fone" numeric NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_994cdcb2c56dfb5b66217c854cc" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_db1ed6d13afe6b6184cc72bb906" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_db1ed6d13afe6b6184cc72bb906"`);
            yield queryRunner.query(`DROP TABLE "contatos"`);
            yield queryRunner.query(`DROP TABLE "user"`);
        });
    }
}
exports.initialMigrate1685036763372 = initialMigrate1685036763372;
