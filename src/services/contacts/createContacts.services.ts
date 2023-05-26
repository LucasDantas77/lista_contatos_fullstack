import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";
import { tReturnContact } from "../../interfaces/contact.interfaces";
import { returnContact } from "../../schemas/contact.schema";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entities";

const createContactsService = async (
  contactData:Contacts,
  userId: number
): Promise<tReturnContact> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const contact:Contacts = await contactRepository.create(contactData);

  const existingEmail = await contactRepository.findOne({
    where: { email: contactData.email },
  });
  if (existingEmail) {
    throw new AppError("Email already exists", 409);
  }

  const existingPhone = await contactRepository.findOne({
    where: { fone: contactData.fone },
  });
  if (existingPhone) {
    throw new AppError("Phone already exists", 409);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  contact.user = user;
  await contactRepository.save(contact);

  const newContact = returnContact.parse(contact);

  const contactWithUserId = {
    ...newContact,
    userId: user.id,
  };

  return contactWithUserId;
};

export { createContactsService };
