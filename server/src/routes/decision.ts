import { Router } from 'express';
import { createRationaleDecision, deleteRationaleDecision, getAllRationaleDecisions, getRationaleDecisionById, updateRationaleDecision } from '../controller/decision';

const rationaleDecisionRoute: Router = Router();

rationaleDecisionRoute.get('/', getAllRationaleDecisions);
rationaleDecisionRoute.get('/:id', getRationaleDecisionById);
rationaleDecisionRoute.post('/', createRationaleDecision);
rationaleDecisionRoute.put('/:id', updateRationaleDecision);
rationaleDecisionRoute.delete('/:id', deleteRationaleDecision);

export default rationaleDecisionRoute;
