
import { Route, Routes } from 'react-router-dom'
import LayoutWebsite from '../pages/(website)/LayoutWebsite'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}></Route>
      <Route path='admin' element={<LayoutAdmin />}></Route>
    </Routes>
  )
}

export default Router