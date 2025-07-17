import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/budget';
import { ExpensesController } from '../controllers/ExpenseController';
import { validateExpenseExist, validateExpenseId, validateExpenseInput } from '../middleware/expense';

const router = Router()

router.param('budgetId', validateBudgetId);//Esto dice que cada vez que se ejecute un enpoint que tiene un id mande a llamar el midleware que valida id
router.param('budgetId', validateBudgetExist);//Esto dice que cada vez que se ejecute un enpoint que tiene un id mande a llamar el midleware que valida si existe el registro.

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExist)

router.get('/', BudgetController.getAll)

router.post('/',//Ruta a llamar
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create) //LLamada a la funcion del controlador

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById)

router.delete('/:budgetId',
    // param('id').isInt().withMessage('ID no válido')
    //     .custom(value => value > 0).withMessage('ID no válido'),
    // handleInputErrors,|
    BudgetController.deleteById)


// ROUTES FOR EXPENSES
router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create)
    
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById)

router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router;