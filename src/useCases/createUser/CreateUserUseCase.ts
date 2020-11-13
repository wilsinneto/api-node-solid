import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserUseCase {
  private usersRepository: IUsersRepository;
  
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute() {
    
  }
}