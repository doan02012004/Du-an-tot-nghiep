import { useNavigate, useSearchParams } from "react-router-dom"
import useOrderStatusCountQuery from "../../../../common/hooks/dashboard/useOrderStatusCountQuery"
import { useEffect, useState } from "react"
import { Button } from "antd"
import { RightOutlined } from "@ant-design/icons"


const DashboardCard02 = () => {
    const [total,setTotal] = useState<number>(0)
    const [searchParams,] = useSearchParams()
    const navigate = useNavigate()
    const startDate = searchParams.get('startDate') 
    const finishDate = searchParams.get('finishDate')
    const orderCountQuery = useOrderStatusCountQuery({startDate:startDate,endDate:finishDate,status:"pending,paid"})
   useEffect(()=>{
    if(orderCountQuery?.data){
      setTotal(orderCountQuery?.data?.total)
    }else{
      setTotal(0)
    }
   },[startDate,finishDate,orderCountQuery.data])
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm shadow-red rounded-xl">
        <div className="p-5">
          <header className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-red dark:text-gray-100 mb-2">Đơn hàng mới</h2>
            {total>0 && (<Button onClick={()=>navigate('/admin/orders')}><RightOutlined /></Button>)}
          </header>
          {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div> */}
          <div className="flex items-start">
            <div className="text-xl font-bold text-red dark:text-gray-100 mr-2">{total}</div>
            {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div> */}
          </div>
        </div>
      </div>
    );
}

export default DashboardCard02