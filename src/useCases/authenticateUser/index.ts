import { hashProvider, usersRepository } from './AuthenticateUserContainer'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const authenticateUserUseCase = new AuthenticateUserUseCase(
  usersRepository,
  hashProvider
)

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserUseCase, authenticateUserController }
