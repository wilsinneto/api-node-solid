import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {  
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
    
    if (userAlreadyExists) throw new Error("User already exists.")

    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: "Team X",
        email: "teamx@outlooc.com"
      },
      subject: "Reunião - Catalog",
      body: "<p>Será discutido e definidos sobre os tópicos que serão o sistema deverá ter na sua 1º versão.</p>"
    })
  }
}