import { app } from '../../app'
import request from 'supertest'
import { InternalError } from '@errors/InternalError'
import { FakeUsersRepository } from '@repositories/implementations/fakes/FakeUsersRepository'
import { FakeHashProvider } from '@providers/HashProvider/implementations/fakes/FakeHashProvider'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    FakeUsersRepository.truncate()
  })

  describe('Unitary Tests', () => {
    let fakeUsersRepository: FakeUsersRepository
    let fakeHashProvider: FakeHashProvider

    beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository()
      fakeHashProvider = new FakeHashProvider()
    })

    it('should be able to create a new user', async () => {
      const createUserUseCase = new CreateUserUseCase(
        fakeUsersRepository,
        fakeHashProvider
      )

      const user = await createUserUseCase.execute({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        password: '123',
        deliveryman: true,
      })

      expect(user.name).toBe('John Doe')
    })

    it('should not to be able to create a new user with an existent email', async () => {
      expect.assertions(1)

      const createUserUseCase = new CreateUserUseCase(
        fakeUsersRepository,
        fakeHashProvider
      )

      await createUserUseCase.execute({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        password: '123',
        deliveryman: true,
      })

      await expect(
        createUserUseCase.execute({
          name: 'John Doe',
          email: 'john.doe@domain.com',
          password: '123',
          deliveryman: true,
        })
      ).rejects.toBeInstanceOf(InternalError || Error)
    })
  })

  describe('Integration Test', () => {
    it('should be able to create a new user', async (done) => {
      const response = await request(app).post('/users').send({
        name: 'Joana Doe',
        email: 'joana32147@domain.com',
        password: '123456',
        deliveryman: true,
      })

      expect(response.status).toBe(201)

      done()
    })

    it('should not to be able to create a new user with an existent email', async (done) => {
      await request(app).post('/users').send({
        name: 'Joana Doe',
        email: 'joana32147@domain.com',
        password: '123456',
        deliveryman: true,
      })

      const response = await request(app).post('/users').send({
        name: 'Joana Doe',
        email: 'joana32147@domain.com',
        password: '123456',
        deliveryman: true,
      })

      expect(response.status).toBe(400)

      done()
    })
  })
})
