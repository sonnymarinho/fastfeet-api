import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findByEmail(email: string): Promise<User | (null | undefined)> {
    const user = this.users.find((user) => {
      return user.email === email
    })

    return user
  }

  public async create(user: User): Promise<User> {
    const createdUser = new User(user)
    this.users.push(createdUser)

    return createdUser
  }
}

export { UsersRepository }
