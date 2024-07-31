import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import PageSignin from '../pages/(website)/Auth/Signin/Page'
import PageSignup from '../pages/(website)/Auth/Signup/Page'
import LayoutWebsite from '../pages/(website)/LayoutWebsite'
import PageBlog from '../pages/(website)/Blog/BlogPage/Page'
import PageDetail from '../pages/(website)/Blog/BlogDetail/Page'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
        <Route path='/signin' element={<PageSignin />} />
        <Route path='/signup' element={<PageSignup />} />
        <Route path='/blog' element={<PageBlog />} />
        <Route path='/blogdetail' element={<PageDetail />} />
      </Route>
      <Route path='admin' element={<LayoutAdmin />}></Route>
    </Routes>
  )
}

export default Router