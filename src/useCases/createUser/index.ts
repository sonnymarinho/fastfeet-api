import { hashProvider, usersRepository } from './CreateUserContainer'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
