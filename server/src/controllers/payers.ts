import db from '../config/db'
import {Request, Response} from 'express'

export default {
    async index(req: Request, res: Response) {
        try {
            const payers = await db('payers')

            res.json(payers)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    },

    async create(req: Request, res: Response) {
        try {
            await db('payers').insert(req.body)

            res.status(201).send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params

            await db('payers').update(req.body).where('id', id)

            res.send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    }
}