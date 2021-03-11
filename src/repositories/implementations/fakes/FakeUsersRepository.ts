import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'

class FakeUsersRepository implements IUsersRepository {
  private static users: User[] = []

  public async findByEmail(email: string): Promise<User | (null | undefined)> {
    const user = FakeUsersRepository.users.find((user) => {
      return user.email === email
    })

    return user
  }

  public async create(user: User): Promise<User> {
    const createdUser = new User(user)
    FakeUsersRepository.users.push(createdUser)

    return createdUser
  }

  public static async truncate(): Promise<void> {
    FakeUsersRepository.users = []
  }
}

export { FakeUsersRepository }
