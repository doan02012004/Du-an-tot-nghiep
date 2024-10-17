import { Outlet } from 'react-router-dom'
import OrderList from './_components/OrderList'

type Props = {}

const OrdersPage = (props: Props) => {
  return (
    <Outlet />
  )
}

export default OrdersPage