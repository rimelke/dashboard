import db from '../config/db'
import {Request, Response} from 'express'

export default {
    async index(req: Request, res: Response) {
        try {
            const spents = await db('spents')
                .join('payers', 'spents.payer_id', '=', 'payers.id')
                .select(['spents.id', 'spents.date', 'spents.beneficiary', 'spents.resume', 'spents.amount', 'payers.name as payer_name'])
                .orderBy('spents.date', 'desc')

            res.json(spents)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    },

    async create(req: Request, res: Response) {
        try {
            const user_id = req.user_id

            await db('spents').insert({...req.body, user_id})

            res.status(201).send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    },
    /*
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params

            await db('spents').update(req.body).where('id', id)

            res.send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    }
    */
}