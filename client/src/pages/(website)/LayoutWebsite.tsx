
import { Outlet } from 'react-router-dom'
import Footer from './_components/Footer'
import Header from './_components/Header'
import ChatWidget from './chatwidget/ChatWidget'
import { useContext } from 'react'
import { AppContext } from '../../common/contexts/AppContextProvider'
import ErrorAuth from './_components/ErrorAuth'

const LayoutWebsite = () => {
  const { currentUser, validateAuth } = useContext(AppContext)
  return (
    <>
      <Header />
      {currentUser && currentUser?.role !== 'admin' && (
        <ChatWidget />
      )}
      <Outlet />
      <Footer />

      {/* validateAuth  */}
      {validateAuth && (<ErrorAuth />)}
    </>
  )
}

export default LayoutWebsite