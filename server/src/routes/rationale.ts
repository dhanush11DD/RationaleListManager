import {Router} from 'express'
import { createRationale, deleteRationale, getAllRationales, getRationaleById, updateRationale } from '../controller/rationale';

const rationaleRoute:Router = Router();

rationaleRoute.get('/',getAllRationales);
rationaleRoute.get('/:id',getRationaleById);
rationaleRoute.post('/',createRationale);
rationaleRoute.put('/:id',updateRationale);
rationaleRoute.delete('/:id',deleteRationale);

export default rationaleRoute;  