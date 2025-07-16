import { Request, Response, NextFunction } from 'express'
import { param, validationResult, body } from 'express-validator'
import Budget from '../models/Budget'

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('budgetId').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido').run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params;
        const budget = await Budget.findByPk(budgetId);
        if (!budget) {
            const error = new Error('Presupuesto no encontrado')
            return res.status(404).json({ error: error.message })
        }
        req.budget = budget
        next()
    }
    catch (error) {
        res.status(500).json({ error: 'Error en la petición' })
        return;
    }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name') //Validaciones para campo name
        .notEmpty().withMessage('El nombre del presupuesto es obligatorio').run(req)

    await body('amount') //Validaciones para campo amount
        .notEmpty().withMessage('La cantidad del presupuesto no puede ir vacia')
        .isNumeric().withMessage('La cantidad no es valida')
        .custom(value => value > 0).withMessage('El presupuesto debe ser mayor a 0').run(req)

    next()
}