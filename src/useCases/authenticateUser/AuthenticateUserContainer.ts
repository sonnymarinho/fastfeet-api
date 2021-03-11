import { BcryptHashProvider } from '@providers/HashProvider/implementations/bcrypt/BcryptHashProvider'
import { FakeHashProvider } from '@providers/HashProvider/implementations/fakes/FakeHashProvider'
import { FakeUsersRepository } from '@repositories/implementations/fakes/FakeUsersRepository'
import { UsersRepository } from '@repositories/implementations/prisma/UsersRepository'

const isTesting = process.env.NODE_ENV === 'test'

const hashProvider = isTesting
  ? new FakeHashProvider()
  : new BcryptHashProvider()

const usersRepository = isTesting
  ? new FakeUsersRepository()
  : new UsersRepository()

export { usersRepository, hashProvider }
