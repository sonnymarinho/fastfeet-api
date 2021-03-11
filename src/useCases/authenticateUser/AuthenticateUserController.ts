import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const { user, token } = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    return response.json({
      user,
      token,
    })
  }
}

export { AuthenticateUserController }
