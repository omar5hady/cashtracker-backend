import type { Request, Response } from 'express'
import Expense from '../models/Expense';

export class ExpensesController {
    static create = async (req: Request, res: Response) => {
        try {
            const expense = new Expense(req.body)
            expense.budgetId = req.budget.id
            await expense.save()
            res.status(201).json("Gasto agregado correctamente")
            return
        } catch (error) {
            res.status(500).json({ error: 'Error en la petición' })
            return;
        }
    }

    static getById = async (req: Request, res: Response) => {
        res.json(req.expense);
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body)
        res.json("Gasto actualizado correctamente")
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy()
        res.json("Gasto eliminado correctamente")

    }
}