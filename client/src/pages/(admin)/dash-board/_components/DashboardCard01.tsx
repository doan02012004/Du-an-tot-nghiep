import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useRevenueQuery from "../../../../common/hooks/dashboard/useRevenueQuery";
import { formatPrice } from "../../../../common/utils/product";


function DashboardCard01() {
  const [total,setTotal] = useState<number>(0)
  const [searchParams,] = useSearchParams()
  const startDate = searchParams.get('startDate') 
  const finishDate = searchParams.get('finishDate')
  const revenceQuery = useRevenueQuery({startDate:startDate,endDate:finishDate,type:'revenue'})
 useEffect(()=>{
  if(revenceQuery?.data){
    setTotal(revenceQuery?.data?.total)
  }else{
    setTotal(0)
  }
 },[startDate,finishDate,revenceQuery])
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm shadow-blue rounded-xl">
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-blue dark:text-gray-100 mb-2">Doanh Thu</h2>
        </header>
        {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div> */}
        <div className="flex items-start">
          <div className="text-xl font-bold text-blue dark:text-gray-100 mr-2">{formatPrice(total)}đ</div>
          {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
