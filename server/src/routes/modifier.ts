import { Router } from 'express';
import { createRationaleModifier, deleteRationaleModifier, getAllRationaleModifiers, getRationaleModifierById, updateRationaleModifier } from '../controller/modifier';

const rationaleModifierRoute: Router = Router();

rationaleModifierRoute.get('/', getAllRationaleModifiers);
rationaleModifierRoute.get('/:id', getRationaleModifierById);
rationaleModifierRoute.post('/', createRationaleModifier);
rationaleModifierRoute.put('/:id', updateRationaleModifier);
rationaleModifierRoute.delete('/:id', deleteRationaleModifier);

export default rationaleModifierRoute;
