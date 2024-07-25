import productRouter from './productRouter.js'
import categoryouter from './categoryRouter.js'
const routes = (app)=>{
  app.use('/api/products',productRouter)
  app.use('/api/categories',categoryouter)
}

export default routes