import  Router from 'express'
import auth from '../../middleWare/auth.middleWare.js'
import * as userController from './Controller/user.js'
const router = Router()

router.get('/',userController.GetUserModule)
router.get('/profile',auth,userController.profile)
router.post('/pay',auth,userController.pay)

export default router 