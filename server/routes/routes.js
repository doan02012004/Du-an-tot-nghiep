import productRouter from './productRouter.js'
const routes = (app)=>{
  app.use('/api/products',productRouter)
}

export default routes