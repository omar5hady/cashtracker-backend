import type { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                //Aqui se aplican filtros, ordenamiento, etc
                order: [
                    // ['created_at', 'DESC'],
                    ['amount', 'ASC']
                ],
                // limit: 10, 
                // where: {
                //     name: 'Vacaciones'
                // }
                // TODO: Filtrar por el usuario
            })
            res.json(budgets)
            return;
        } catch (error) {

        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save();
            res.status(201).json("Presupuesto creado correctamente");
            return;
        } catch (error) {
            res.status(500).json({ error: 'Error en la petición' })
            return;
        }
    }

    static getById = async (req: Request, res: Response) => {
        res.json(req.budget)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.json("Presupuesto actualizado correctamente")
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.budget.destroy()
        res.json("Presupuesto eliminado correctamente")
    }
}