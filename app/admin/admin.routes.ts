import express from 'express'
import { authAdmin, registerAdmin } from './admin.controller'

const router = express.Router()

router.route('/login').post(authAdmin)
router.route('/register').post(registerAdmin)

export default router
