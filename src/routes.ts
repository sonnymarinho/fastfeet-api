import { createUserController } from '@useCases/createUser'
import { Router } from 'express'

const router = Router()

router.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})

export { router as routes }
