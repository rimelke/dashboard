import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
    id: number
}

export default (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({message: 'No token provided'})

    const parts = authorization.split(' ')

    if (parts.length !== 2)
        return res.status(401).send({message: 'Token schema error'})

    const [schema, token] = parts

    if (!/^Lummos$/i.test(schema))
        return res.status(401).send({message: 'Token type error'})

    jwt.verify(token, process.env.SECRET || 'SECRET_EXAMPLE', (err, decoded) => {
        if (err || !decoded)
            return res.status(401).send({message: 'Invalid token'})
        const { id } = <DecodedToken>decoded
        req.user_id = id
        next()
    })
}