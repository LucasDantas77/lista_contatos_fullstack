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
exports.deleteUserController = exports.updateUserController = exports.listUserController = exports.createUserController = void 0;
const createUser_services_1 = require("../services/users/createUser.services");
const listUser_service_1 = require("../services/users/listUser.service");
const updateUser_service_1 = require("../services/users/updateUser.service");
const deleteUser_service_1 = require("../services/users/deleteUser.service");
const errors_1 = require("../errors");
const createUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = request.body;
    const newUserData = yield (0, createUser_services_1.createUserService)(userData);
    return response.status(201).json(newUserData);
});
exports.createUserController = createUserController;
const listUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.user.id;
    const userInfo = yield (0, listUser_service_1.listUserService)(userId);
    return response.status(200).json(userInfo);
});
exports.listUserController = listUserController;
const updateUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = request.body;
    const userId = request.user.id;
    const updateUser = yield (0, updateUser_service_1.updateUserService)(userData, userId);
    return response.json(updateUser);
});
exports.updateUserController = updateUserController;
const deleteUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user.id;
        yield (0, deleteUser_service_1.deleteUserService)(userId);
        return response.status(204).send();
    }
    catch (error) {
        throw new errors_1.AppError("User not exist", 400);
    }
});
exports.deleteUserController = deleteUserController;
