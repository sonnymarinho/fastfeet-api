import { PrismaClient } from '@prisma/client'

import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private ormRepository: PrismaClient

  constructor() {
    this.ormRepository = new PrismaClient()
  }

  public async findByEmail(email: string): Promise<User | (null | undefined)> {
    const user = await this.ormRepository.users.findFirst({
      where: { email: email },
    })

    return user
  }

  public async create(user: User): Promise<User> {
    const createdUser = await this.ormRepository.users.create({
      data: { ...user },
    })

    return createdUser as User
  }
}

export { UsersRepository }
