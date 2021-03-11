import { app } from '../../app'
import request from 'supertest'
import { InternalError } from '@errors/InternalError'
import { FakeUsersRepository } from '@repositories/implementations/fakes/FakeUsersRepository'
import { FakeHashProvider } from '@providers/HashProvider/implementations/fakes/FakeHashProvider'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { User } from '@entities/User'

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    FakeUsersRepository.truncate()
  })

  describe('Unitary Tests', () => {
    let fakeUsersRepository: FakeUsersRepository
    let fakeHashProvider: FakeHashProvider
    let authenticateUserUseCase: AuthenticateUserUseCase

    beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository()
      fakeHashProvider = new FakeHashProvider()

      authenticateUserUseCase = new AuthenticateUserUseCase(
        fakeUsersRepository,
        fakeHashProvider
      )

      authenticateUserUseCase = new AuthenticateUserUseCase(
        fakeUsersRepository,
        fakeHashProvider
      )
    })

    it('should be able to authenticate a user', async () => {
      const createdUser = new User({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        cpf: '077.651.720-18',
        password: await fakeHashProvider.generateHash('123'),
        deliveryman: true,
      })

      await fakeUsersRepository.create(createdUser)

      const { user, token } = await authenticateUserUseCase.execute({
        email: 'john.doe@domain.com',
        password: '123',
      })

      expect(user.id).toBe(createdUser.id)
      expect(!!token).toBe(true)
    })

    it('should not be able return the user password when a user sign', async () => {
      const createdUser = new User({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        cpf: '077.651.720-18',
        password: await fakeHashProvider.generateHash('123'),
        deliveryman: true,
      })

      await fakeUsersRepository.create(createdUser)

      const { user } = await authenticateUserUseCase.execute({
        email: 'john.doe@domain.com',
        password: '123',
      })

      expect(!!user.password).toBe(false)
    })

    it('should not be able to authenticate a no existing user', async () => {
      expect.assertions(1)

      await expect(
        authenticateUserUseCase.execute({
          email: 'john.doe@domain.com',
          password: '123',
        })
      ).rejects.toBeInstanceOf(InternalError || Error)
    })
  })

  describe('Integration Test', () => {
    let fakeUsersRepository: FakeUsersRepository
    let fakeHashProvider: FakeHashProvider

    beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository()
      fakeHashProvider = new FakeHashProvider()
    })

    it('should be able to authenticate a user', async (done) => {
      const createdUser = new User({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        cpf: '077.651.720-18',
        password: await fakeHashProvider.generateHash('123'),
        deliveryman: true,
      })

      await fakeUsersRepository.create(createdUser)

      const response = await request(app).post('/sessions').send({
        email: 'john.doe@domain.com',
        password: '123',
      })

      expect(response.body.user.id).toBe(createdUser.id)
      expect(response.body.token.length).toBe(188)

      done()
    })

    it('should not be able return the user password when a user sign', async (done) => {
      const createdUser = new User({
        name: 'John Doe',
        email: 'john.doe@domain.com',
        cpf: '077.651.720-18',
        password: await fakeHashProvider.generateHash('123'),
        deliveryman: true,
      })

      await fakeUsersRepository.create(createdUser)

      const response = await request(app).post('/sessions').send({
        email: 'john.doe@domain.com',
        password: '123',
      })

      expect(!!response.body.user.password).toBe(false)

      done()
    })

    it('should not be able to authenticate a no existing user', async (done) => {
      const response = await request(app).post('/sessions').send({
        email: 'john.doe@domain.com',
        password: '123',
      })

      expect(response.status).toBe(401)

      done()
    })
  })
})
