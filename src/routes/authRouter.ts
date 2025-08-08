import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";


const router = Router()

router.use(limiter);

// router.use(limiter)//De esta manera aplicas el limiter configurado a todas las rutas de este router

router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('El Password debe ser de mínimo 8 caracteres'),
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.createAccount)

router.post('/confirm-account',
    body('token').notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('Token no valido'),
    handleInputErrors,
    AuthController.confirmAccount)

router.post('/login',
    body('email').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    handleInputErrors,
    AuthController.login)

router.post('/forgot-password',
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token').notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('Token no valido'),
    handleInputErrors,
    AuthController.validateToken)

router.post('/reset-password/:token',
    param('token').notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('Token no valido'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('El Password debe ser de mínimo 8 caracteres'),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

router.get('/user',
    authenticate,
    AuthController.user
)

export default router