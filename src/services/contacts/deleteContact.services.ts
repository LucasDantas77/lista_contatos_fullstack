import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Contacts } from "../../entities/contacts.entities";

const deleteContactUserService = async (contactId: number, userId: number) => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const contact = await contactRepository.findOne({ where: { id: contactId } });

  if (!contact) {
    throw new AppError("Contact not found", 404);
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

  await contactRepository.delete(contactId);

  return { message: "Contact deleted successfully" };
};

export { deleteContactUserService };
