import type { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';


export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body

        // Prevenir duplicados
        const userExist = await User.findOne({
            where: { email }
        })
        if (userExist) {
            const error = new Error("Un usuario con ese email ya esta registrado")
            return res.status(409).json({ error: error.message })
        }

        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token,
            })

            res.json('Cuenta creada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body

        const user = await User.findOne({ where: { token } })

        if (!user) {
            const error = new Error('Token no valido')
            return res.status(401).json({ error: error.message })
        }
        user.confirmed = true
        user.token = null
        await user.save()
        res.json("Cuenta confirmada correctamente")
        console.log("Desde confirm account");
    }
}