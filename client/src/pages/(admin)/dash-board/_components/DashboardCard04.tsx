import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useUserDashBoard from "../../../../common/hooks/dashboard/useUserDashBoard"



const DashboardCard04 = () => {
    const [total,setTotal] = useState<number>(0)
    const [searchParams,] = useSearchParams()
    const startDate = searchParams.get('startDate') 
    const finishDate = searchParams.get('finishDate')
    const userNewCountQuery = useUserDashBoard({startDate:startDate,endDate:finishDate,type:"count"})
   useEffect(()=>{
    if(userNewCountQuery?.data){
      setTotal(userNewCountQuery?.data?.total)
    }else{
      setTotal(0)
    }
   },[startDate,finishDate,userNewCountQuery?.data])
    return (
      <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm shadow-orange rounded-xl">
        <div className="p-5">
          <header className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-orange dark:text-gray-100 mb-2">Khách hàng mới</h2>
          </header>
          {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div> */}
          <div className="flex items-start">
            <div className="text-xl font-bold text-orange dark:text-gray-100 mr-2">{total}</div>
            {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div> */}
          </div>
        </div>
      </div>
    );
}

export default DashboardCard04