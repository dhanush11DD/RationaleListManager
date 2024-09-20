import { Router } from 'express';
import { createRationaleSpecialty, deleteRationaleSpecialty, getAllRationaleSpecialties, getRationaleSpecialtyById, updateRationaleSpecialty } from '../controller/specialty';

const rationaleSpecialtyRoute: Router = Router();

rationaleSpecialtyRoute.get('/', getAllRationaleSpecialties);
rationaleSpecialtyRoute.get('/:id', getRationaleSpecialtyById);
rationaleSpecialtyRoute.post('/', createRationaleSpecialty);
rationaleSpecialtyRoute.put('/:id', updateRationaleSpecialty);
rationaleSpecialtyRoute.delete('/:id', deleteRationaleSpecialty);

export default rationaleSpecialtyRoute;
