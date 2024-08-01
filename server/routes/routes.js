import addressRouter from './addressRouter.js'
import productRouter from './productRouter.js'
import categoryouter from './categoryRouter.js'
import userRouter from './userRouter.js'
const routes = (app)=>{
  app.use('/api/products',productRouter)
  app.use('/api/users',userRouter)
  app.use('/api/addresses',addressRouter)
  app.use('/api/categories',categoryouter)
}

export default routes