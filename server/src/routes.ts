import { Router } from 'express'
import { Joi, celebrate } from 'celebrate'

import authController from './controllers/auth'
import payersController from './controllers/payers'
import spentsController from './controllers/spents'

import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/auth/login', celebrate({
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }).required()
}, {abortEarly: false}), authController.login)

routes.use(authMiddleware)

routes.get('/payers', payersController.index)
routes.post('/payers', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
    }).required()
}, {abortEarly: false}), payersController.create)
routes.put('/payers/:id', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
    }).required(),
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required()
    }).required()
}, {abortEarly: false}), payersController.update)

routes.get('/spents', spentsController.index)
routes.get('/spents/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().positive().integer().required()
    }).required()
}, {abortEarly: false}), spentsController.show)
routes.post('/spents', celebrate({
    body: Joi.object().keys({
        payer_id: Joi.number().positive().integer().required(),
        date: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
        beneficiary: Joi.string().required(),
        resume: Joi.string().required(),
        description: Joi.string(),
        receipt: Joi.string(),
        amount: Joi.number().positive().required()
    }).required()
}, {abortEarly: false}), spentsController.create)
routes.delete('/spents/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().positive().integer().required()
    }).required()
}, {abortEarly: false}), spentsController.delete)

export default routes