import { container } from "tsyringe";
import { UsersRepositories } from "../../modules/users/repositories/implementations/UsersRepositories";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepositories",
    UsersRepositories
)