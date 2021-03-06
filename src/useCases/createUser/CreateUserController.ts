import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = await this.createUserUseCase.execute({
      name: name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
