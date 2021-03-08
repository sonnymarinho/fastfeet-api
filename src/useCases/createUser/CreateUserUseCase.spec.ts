import { User } from '@entities/User'
import { InternalError } from '@errors/InternalError'
import { UsersRepository } from '@repositories/implementations/fakes/UsersRepository'
import { v4 } from 'uuid'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('CreateUserUseCase', () => {
  let fakeUsersRepository: UsersRepository

  beforeEach(() => {
    fakeUsersRepository = new UsersRepository()
  })

  it('should be able to create a new user', async () => {
    const createUserUseCase = new CreateUserUseCase(fakeUsersRepository)

    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123',
    })

    expect(user instanceof User).toBe(true)
    expect(user.name).toBe('John Doe')
  })

  it('should not to be able to create a new user with an existent email', async () => {
    expect.assertions(1)

    const createUserUseCase = new CreateUserUseCase(fakeUsersRepository)

    await fakeUsersRepository.create({
      id: v4(),
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123',
    })

    await expect(
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(InternalError || Error)
  })
})
