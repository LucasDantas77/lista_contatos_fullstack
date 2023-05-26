import { z } from "zod";
import {
  passwordOmit,
  returnGetUserInfOffPass,
  returnUser,
  returnUsers,
  usersCreateSchema,
} from "../schemas/user.schemas";

type iUsers = z.infer<typeof usersCreateSchema>;
type iUsersReturn = z.infer<typeof returnUsers>;
type iUserOmitPass = z.infer<typeof passwordOmit>;
type UserAll = z.infer<typeof returnGetUserInfOffPass>;

export { iUsers, iUsersReturn, iUserOmitPass, UserAll };
