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

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const spent = await db('spents')
                .join('payers', 'spents.payer_id', '=', 'payers.id')
                .join('users', 'spents.user_id', '=', 'users.id')
                .where('spents.id', id)
                .select(['spents.*', 'payers.name as payer_name', 'users.username as user_name'])
                .first()

            if (spent) res.json(spent)
            else res.status(400).json({message: 'Spent not found'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    },

    async create(req: Request, res: Response) {
        const trx = await db.transaction()

        try {
            const user_id = req.user_id

            await trx('spents').insert({...req.body, user_id})

            const spents = await trx('spents').sum({sum: 'amount'}).where('payer_id', req.body.payer_id).first()

            await trx('payers').update({
                balance: spents?.sum
            }).where('id', req.body.payer_id)

            await trx.commit()

            res.status(201).send()
        } catch (e) {
            await trx.rollback(e)
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