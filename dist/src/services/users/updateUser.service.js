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
exports.updateUserService = void 0;
const data_source_1 = require("../../data-source");
const user_entities_1 = require("../../entities/user.entities");
const user_schemas_1 = require("../../schemas/user.schemas");
const errors_1 = require("../../errors");
const updateUserService = (userData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entities_1.User);
    const oldUser = yield userRepository.findOneBy({
        id: userId,
    });
    const user = userRepository.merge(oldUser, userData);
    if (oldUser.fone && typeof oldUser.fone === "string") {
        const parsedPhone = parseInt(oldUser.fone);
        if (!isNaN(parsedPhone)) {
            oldUser.fone = parsedPhone;
        }
        else {
            throw new errors_1.AppError("Invalid phone number", 400);
        }
    }
    yield userRepository.save(user);
    const userUpdate = user_schemas_1.passwordOmit.parse(user);
    return userUpdate;
});
exports.updateUserService = updateUserService;
