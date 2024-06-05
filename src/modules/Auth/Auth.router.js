import  Router from 'express'
import validation from '../../middleWare/validation.middleWare.js'
import { loginSchema, signupSchema } from './auth.validation.js'
import * as AuthController from './Controller/Auth.js'
const router = Router()

router.get('/',AuthController.GetAuthModule)
router.post('/signup',validation(signupSchema),AuthController.signup)
router.post('/login',validation(loginSchema),AuthController.login)

export default router