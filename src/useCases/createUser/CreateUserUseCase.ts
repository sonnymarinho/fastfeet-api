import { User } from '@entities/User'
import { InternalError } from '@errors/InternalError'
import { IUsersRepository } from '@repositories/IUsersRepository'
import IHashProvider from 'providers/HashProvider/IHashProvider'
import { ICreateUserDTO } from './ICreateUserDTO'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute(data: ICreateUserDTO) {
    const { name, email, password, deliveryman } = data

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new InternalError('E-mail is already in use.', 'bad-request')
    }

    if (!deliveryman) {
      throw new InternalError(
        'Inform if the user is a deliveryman or not.',
        'bad-request'
      )
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = new User({
      name,
      email,
      password: hashedPassword,
      deliveryman,
    })

    await this.usersRepository.create(user)

    const { password: _, ...formattedUser } = user

    return formattedUser
  }
}
