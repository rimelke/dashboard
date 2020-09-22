import { Router } from 'express'
import { Joi, celebrate } from 'celebrate'

import authController from './controllers/auth'

import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/auth/login', celebrate({
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }).required()
}, {abortEarly: false}), authController.login)

routes.use(authMiddleware)

export default routes