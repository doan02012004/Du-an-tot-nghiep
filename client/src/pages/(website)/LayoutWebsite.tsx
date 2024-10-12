
import { Outlet } from 'react-router-dom'
import Footer from './_components/Footer'
import Header from './_components/Header'
import ChatWidget from './chatwidget/ChatWidget'

const LayoutWebsite = () => {
  return (
    <>
      <Header />
      <ChatWidget />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutWebsite