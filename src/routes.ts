import { celebrate, Joi, Segments } from 'celebrate'
import { createUserController } from '@useCases/createUser'
import { authenticateUserController } from '@useCases/authenticateUser'
import { Router } from 'express'

const router = Router()

router.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      deliveryman: Joi.boolean().required(),
    },
  }),
  async (request, response) => {
    await createUserController.handle(request, response)
  }
)

router.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    await authenticateUserController.handle(request, response)
  }
)

export { router as routes }
