import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Contacts } from "../../entities/contacts.entities";
import { tReturnContactUpdate } from "../../interfaces/contact.interfaces";
import { User } from "../../entities/user.entities";
import { updatedContactUser } from "../../schemas/contact.schema";

const updateContactUserService = async (
  contactId: number,
  contactData: Contacts,
  userId: number
): Promise<tReturnContactUpdate> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const contact = await contactRepository.findOne({ where: { id: contactId } });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contactBody = await contactRepository
    .createQueryBuilder("contact")
    .leftJoinAndSelect("contact.user", "user")
    .where("contact.id = :contactId", { contactId })
    .andWhere("user.id = :userId", { userId })
    .getOne();
  if (!contactBody) {
    throw new AppError("Contact not found", 404);
  }

  const updatedContact = contactRepository.merge(contact, contactData);
  if (updatedContact.fone && typeof updatedContact.fone === "string") {
    const parsedPhone = parseInt(updatedContact.fone);
    if (!isNaN(parsedPhone)) {
      updatedContact.fone = parsedPhone;
    } else {
      throw new AppError("Invalid phone number", 400);
    }
  }
  const savedContact = await contactRepository.save(updatedContact);

  const updatedContactResponse: tReturnContactUpdate =
    updatedContactUser.parse(savedContact);

  return updatedContactResponse;
};

export { updateContactUserService };
