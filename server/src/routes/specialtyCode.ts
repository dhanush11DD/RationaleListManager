import { Router } from 'express';
import { createSpecialtyCode, deleteSpecialtyCode, getAllSpecialtyCodes, getSpecialtyCodeById, updateSpecialtyCode } from '../controller/specialtyCode';

const specialtyCodeRoute: Router = Router();

specialtyCodeRoute.get('/', getAllSpecialtyCodes);
specialtyCodeRoute.get('/:id', getSpecialtyCodeById);
specialtyCodeRoute.post('/', createSpecialtyCode);
specialtyCodeRoute.put('/:id', updateSpecialtyCode);
specialtyCodeRoute.delete('/:id', deleteSpecialtyCode);

export default specialtyCodeRoute;
