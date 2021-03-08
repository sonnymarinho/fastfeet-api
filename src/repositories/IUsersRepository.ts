import { User } from '@entities/User'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | (null | undefined)>
  create(user: User): Promise<User>
}
