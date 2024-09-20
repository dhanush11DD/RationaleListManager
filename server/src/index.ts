import express ,{Express,Request,Response} from 'express'
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';

const app:Express = express()
app.use(express.json())

app.use('/',rootRouter)

export  const prismaClient = new PrismaClient();

app.get('/',(req:Request,res:Response)=>{
        res.send("hi this is form server");
})


app.listen(PORT,()=>console.log(`server runing in ${PORT}`))