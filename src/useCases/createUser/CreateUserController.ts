import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, deliveryman } = request.body

    const user = await this.createUserUseCase.execute({
      name: name,
      email,
      password,
      deliveryman,
    })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
