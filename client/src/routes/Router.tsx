
import { Route, Routes } from 'react-router-dom'
import LayoutWebsite from '../pages/(website)/LayoutWebsite'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import HomePage from '../pages/(website)/home/HomePage'
import MyInformation from '../pages/(website)/my-information/Page'
import Account from '../pages/(website)/my-information/information/Page'
import CartPage from '../pages/(website)/cart/CartPage'
import OrderPage from '../pages/(website)/order/OrderPage'
import ThanksPage from '../pages/(website)/thanks/Page'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path='cart' element={<CartPage/>}/>
          <Route path='order' element={<OrderPage/>}/>
          <Route path='thanks' element={<ThanksPage/>}/>
          <Route path='customer' element={<MyInformation />}>
                <Route path='infor' element={<Account />}/>
          </Route>
      </Route>
      <Route path='admin' element={<LayoutAdmin />}></Route>
    </Routes>
  )
}

export default Router