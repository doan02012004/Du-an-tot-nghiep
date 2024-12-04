
import { Outlet } from 'react-router-dom'
import Footer from './_components/Footer'
import Header from './_components/Header'
import ChatWidget from './chatwidget/ChatWidget'
import { useContext } from 'react'
import { AppContext } from '../../common/contexts/AppContextProvider'

const LayoutWebsite = () => {
  const {currentUser} = useContext(AppContext)
  return (
    <>
      <Header />
     {currentUser && currentUser?.role !=='admin' && (
       <ChatWidget />
     )}
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutWebsite