import { User } from '@entities/User';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { ICreateUserDTO } from './ICreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}
