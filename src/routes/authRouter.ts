import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";


const router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('El Password debe ser de mínimo 8 caracteres'),
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.createAccount)

router.post('/confirm-account', 
    body('token').notEmpty()
    .isLength({min: 6, max: 6})
    .withMessage('Token no valido'),
    handleInputErrors,
    AuthController.confirmAccount)

export default router