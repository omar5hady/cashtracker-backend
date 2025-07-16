import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/budget';

const router = Router()

router.param('budgetId', validateBudgetId);//Esto dice que cada vez que se ejecute un enpoint que tiene un id mande a llamar el midleware que valida id
router.param('budgetId', validateBudgetExist);//Esto dice que cada vez que se ejecute un enpoint que tiene un id mande a llamar el midleware que valida si existe el registro.

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

export default router;