import { Router } from 'express';
import { createRationaleProcedure, deleteRationaleProcedure, getAllRationaleProcedures, getRationaleProcedureById, updateRationaleProcedure } from '../controller/procedure';

const rationaleProcedureRoute: Router = Router();

rationaleProcedureRoute.get('/', getAllRationaleProcedures);
rationaleProcedureRoute.get('/:id', getRationaleProcedureById);
rationaleProcedureRoute.post('/', createRationaleProcedure);
rationaleProcedureRoute.put('/:id', updateRationaleProcedure);
rationaleProcedureRoute.delete('/:id', deleteRationaleProcedure);

export default rationaleProcedureRoute;
