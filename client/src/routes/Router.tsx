
import { Route, Routes } from 'react-router-dom'
import LayoutWebsite from '../pages/(website)/LayoutWebsite'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import CartPage from '../pages/(website)/cart/CartPage'
import OrderPage from '../pages/(website)/order/OrderPage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
        <Route path='cart' element={<CartPage/>}/>
        <Route path='order' element={<OrderPage/>}/>
      </Route>
      <Route path='admin' element={<LayoutAdmin />}></Route>
    </Routes>
  )
}

export default Router