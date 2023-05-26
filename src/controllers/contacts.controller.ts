import { Request, Response } from "express";
import { createContactsService } from "../services/contacts/createContacts.services";
import { updateContactUserService } from "../services/contacts/updateContact.services";
import { deleteContactUserService } from "../services/contacts/deleteContact.services";
import { listContactsService } from "../services/contacts/listContacts.services";

const createContactController = async (
  request: Request,
  response: Response
) => {
  const contactData = request.body;
  const contactId = request.user.id;
  const contact = await createContactsService(contactData, contactId);

  return response.status(201).json(contact);
};

const updateContactController = async (
  request: Request,
  response: Response
) => {
  const updatedContact = await updateContactUserService(
    parseInt(request.params.id),
    request.body,
    request.user.id
  );

  return response.status(200).json(updatedContact);
};

const deleteContactController = async (
  request: Request,
  response: Response
) => {
  const userId = request.user.id;
  const contactId = parseInt(request.params.id);

  const deleteData = await deleteContactUserService(contactId, userId);

  return response.status(200).json(deleteData);
};

const getContactController = async (request: Request, response: Response) => {
  const contactAll = await listContactsService(request.user.id);

  return response.status(200).json(contactAll);
};

export {
  createContactController,
  updateContactController,
  deleteContactController,
  getContactController,
};
