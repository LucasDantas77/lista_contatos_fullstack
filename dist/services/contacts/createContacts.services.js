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
exports.createContactsService = void 0;
const data_source_1 = require("../../data-source");
const contacts_entities_1 = require("../../entities/contacts.entities");
const contact_schema_1 = require("../../schemas/contact.schema");
const errors_1 = require("../../errors");
const user_entities_1 = require("../../entities/user.entities");
const createContactsService = (contactData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entities_1.Contacts);
    const contact = yield contactRepository.create(contactData);
    const existingEmail = yield contactRepository.findOne({
        where: { email: contactData.email },
    });
    if (existingEmail) {
        throw new errors_1.AppError("Email already exists", 409);
    }
    const existingPhone = yield contactRepository.findOne({
        where: { fone: contactData.fone },
    });
    if (existingPhone) {
        throw new errors_1.AppError("Phone already exists", 409);
    }
    const userRepository = data_source_1.AppDataSource.getRepository(user_entities_1.User);
    const user = yield userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new errors_1.AppError("User not found", 404);
    }
    contact.user = user;
    yield contactRepository.save(contact);
    const newContact = contact_schema_1.returnContact.parse(contact);
    const contactWithUserId = Object.assign(Object.assign({}, newContact), { userId: user.id });
    return contactWithUserId;
});
exports.createContactsService = createContactsService;
