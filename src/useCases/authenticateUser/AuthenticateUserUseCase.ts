import { sign } from 'jsonwebtoken'
import { User } from '@entities/User'
import { InternalError } from '@errors/InternalError'
import { IUsersRepository } from '@repositories/IUsersRepository'
import IHashProvider from 'providers/HashProvider/IHashProvider'
import { IAuthenticateUserDTO } from './IAuthenticateUserDTO'

import { jwt as jwtConfig } from '@config/auth'

interface IResponse {
  user: User
  token: string
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute(data: IAuthenticateUserDTO): Promise<IResponse> {
    const findedUser = await this.usersRepository.findByEmail(data.email)

    if (!findedUser) {
      throw new InternalError('Email or password incorrect.', 'unauthorized')
    }

    const passwordsMatch = await this.hashProvider.compareHash(
      data.password,
      findedUser.password
    )

    if (!passwordsMatch) {
      throw new InternalError('Email or password incorrect.', 'unauthorized')
    }

    const { secret, expiresIn } = jwtConfig

    const token = sign({}, secret, {
      subject: findedUser.id,
      expiresIn,
    })

    const { password: _, ...formattedUser } = findedUser

    return { user: formattedUser as User, token }
  }
}
