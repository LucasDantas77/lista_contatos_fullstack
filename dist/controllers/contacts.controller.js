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
exports.deleteContactController = exports.updateContactController = exports.createContactController = void 0;
const createContacts_services_1 = require("../services/contacts/createContacts.services");
const updateContact_services_1 = require("../services/contacts/updateContact.services");
const deleteContact_services_1 = require("../services/contacts/deleteContact.services");
const createContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = request.body;
    const contactId = request.user.id;
    const contact = yield (0, createContacts_services_1.createContactsService)(contactData, contactId);
    return response.status(201).json(contact);
});
exports.createContactController = createContactController;
const updateContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedContact = yield (0, updateContact_services_1.updateContactUserService)(parseInt(request.params.id), request.body, request.user.id);
    return response.status(200).json(updatedContact);
});
exports.updateContactController = updateContactController;
const deleteContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.user.id;
    const contactId = parseInt(request.params.id);
    const deleteData = yield (0, deleteContact_services_1.deleteContactUserService)(contactId, userId);
    return response.status(200).json(deleteData);
});
exports.deleteContactController = deleteContactController;
