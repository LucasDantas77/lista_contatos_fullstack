"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectDataBase = exports.client = void 0;
const config_1 = __importDefault(require("./config"));
exports.client = config_1.default;
const connection_1 = __importDefault(require("./connection"));
exports.conectDataBase = connection_1.default;
