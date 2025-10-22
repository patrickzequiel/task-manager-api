import { Router } from 'express'
import * as userController from '../controllers/userController'
import { loginUserSchema, registerUserSchema } from '../validations/userValidation'
import { validate } from '../middlewares/validation'

const router = Router()

router.post('/login', validate(loginUserSchema), userController.loginUser)

// router.get('/logout', userController.logoutUser)

router.post('/register', validate(registerUserSchema), userController.registerUser)

export default router
