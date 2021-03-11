import { createUserController } from '@useCases/createUser'
import { authenticateUserController } from '@useCases/authenticateUser'
import { Router } from 'express'

const router = Router()

router.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})

router.post('/sessions', async (request, response) => {
  await authenticateUserController.handle(request, response)
})

export { router as routes }
