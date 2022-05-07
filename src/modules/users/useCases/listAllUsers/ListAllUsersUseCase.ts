/* eslint-disable prettier/prettier */
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!user_id) {
      throw new Error("User not found");
    }

    const isUserAdminOrExists = this.usersRepository.findById(user_id);

    if (!isUserAdminOrExists) {
      throw new Error("User does not exist");
    }

    if (!isUserAdminOrExists.admin) {
      throw new Error("User is not an admin");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
