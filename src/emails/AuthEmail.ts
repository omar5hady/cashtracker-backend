import { transport } from "../config/nodemailer";
import User from "../models/User";

type EmailType = {
    name: string
    email: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com>',
            to: user.email,
            subject: 'CashTracker - Confirma tu cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en CashTracker, ya esta casi lista</p>
                <p>Visita el siguiente enlace: </p>
                <a href="#">Confirmar cuenta</a>
                <p>e ingresa el código: <b>${user.token}</b></p>
            `
        })

        console.log("Correo enviado", email.messageId);
    }


    static sendPasswordResetToken = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com>',
            to: user.email,
            subject: 'CashTracker - Restablece tu contraseña',
            html: `
                <p>Hola: ${user.name}, has solicitado reestablecer tu password</p>
                <p>Visita el siguiente enlace: </p>
                <a href="#">Reestablecer contraseña</a>
                <p>e ingresa el código: <b>${user.token}</b></p>
            `
        })

        console.log("Correo enviado", email.messageId);
    }

}