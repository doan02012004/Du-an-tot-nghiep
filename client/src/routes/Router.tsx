
import { Route, Routes } from 'react-router-dom'
import LayoutWebsite from '../pages/(website)/LayoutWebsite'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import HomePage from '../pages/(website)/home/HomePage'
import MyInformation from '../pages/(website)/my-information/Page'
import Account from '../pages/(website)/my-information/information/Page'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path='customer' element={<MyInformation />}>
                <Route path='infor' element={<Account />}/>
          </Route>
      </Route>
      <Route path='admin' element={<LayoutAdmin />}></Route>
    </Routes>
  )
}

export default Router