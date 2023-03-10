import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password is incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password is incorrect!");
        }

        const token = sign({}, "5ebe2294ecd0e0f08eab7690d2a6ee69", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenResponse: IResponse = {
            user: {
                name: user.name,
                email
            },
            token
        }

        return tokenResponse;
    }
}

export { AuthenticateUserUseCase }