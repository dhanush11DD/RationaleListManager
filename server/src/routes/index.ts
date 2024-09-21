import { Router } from "express";
import rationaleRoute from "./rationale";
import specialtyCodeRoute from "./specialtyCode";
import decisionListRoute from "./decisionList";
import rationaleSpecialtyRoute from "./specialty";
import rationaleDecisionRoute from "./decision";
import rationaleProcedureRoute from "./procedure";
import rationaleModifierRoute from "./modifier";


const rootRouter:Router = Router();

rootRouter.use('/rationale',rationaleRoute)
rootRouter.use('/specialty-code',specialtyCodeRoute)
rootRouter.use('/decision-list',decisionListRoute)
rootRouter.use('/specialty',rationaleSpecialtyRoute)
rootRouter.use('/decision',rationaleDecisionRoute)
rootRouter.use('/procedure',rationaleProcedureRoute)
rootRouter.use('/modifier',rationaleModifierRoute)

export default rootRouter;