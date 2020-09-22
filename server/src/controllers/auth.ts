import { Request, Response } from 'express'
import db from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function genToken(id: number) {
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, process.env.SECRET || 'SECRET_EXAMPLE', {}, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })    
    })
}

export default {
    async login(req: Request, res: Response) {
        const {username, password} = req.body

        try {
            const user = await db('users').where('username', username).first()

            if (!user)
                return res.status(400).json({message: 'User not found'})

            if (password.length < 8) return res.status(400).json({message: 'Login failed, try again'})

            bcrypt.compare(password, user.password, async (err, result) => {
                if (err || !result) return res.status(400).json({message: 'Login failed, try again'})
                const token = await genToken(user.id)
                delete user.password
                res.json({user, token})
            })
        } catch (e) {
            res.status(400).json({message: 'Something went wrong, try again'})
        }
    }
}