import { User } from '@entities/User'
import { InternalError } from '@errors/InternalError'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { ICreateUserDTO } from './ICreateUserDTO'

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userAlreadyExists) {
      throw new InternalError('User already exists', 'bad-request')
    }

    const user = new User(data);

    await this.usersRepository.create(user)

    return user
  }
}
