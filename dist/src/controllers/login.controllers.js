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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogincontroller = void 0;
const login_users_services_1 = __importDefault(require("../services/login/login.users.services"));
const createLogincontroller = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = request.body;
    const token = yield (0, login_users_services_1.default)(loginData);
    return response.json({
        token: token,
    });
});
exports.createLogincontroller = createLogincontroller;
