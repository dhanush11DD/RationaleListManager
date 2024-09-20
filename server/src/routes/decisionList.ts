import { Router } from 'express';
import { createDecisionList, deleteDecisionList, getAllDecisionLists, getDecisionListById, updateDecisionList } from '../controller/decisionList';

const decisionListRoute: Router = Router();

decisionListRoute.get('/', getAllDecisionLists);
decisionListRoute.get('/:id', getDecisionListById);
decisionListRoute.post('/', createDecisionList);
decisionListRoute.put('/:id', updateDecisionList);
decisionListRoute.delete('/:id', deleteDecisionList);

export default decisionListRoute;
