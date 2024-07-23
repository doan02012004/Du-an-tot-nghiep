import productRouter from './productRouter.js'
import userRouter from './userRouter.js'
const routes = (app)=>{
  app.use('/api/products',productRouter)
  app.use('/api/users',userRouter)
}

export default routes