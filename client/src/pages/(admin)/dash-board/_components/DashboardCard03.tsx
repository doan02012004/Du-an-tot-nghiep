  import { useSearchParams } from "react-router-dom"
  import useOrderStatusCountQuery from "../../../../common/hooks/dashboard/useOrderStatusCountQuery"
  import { useEffect, useState } from "react"


  const DashboardCard03 = () => {
      const [total,setTotal] = useState<number>(0)
      const [searchParams,] = useSearchParams()
      const startDate = searchParams.get('startDate') 
      const finishDate = searchParams.get('finishDate')
      

      // phần thêm trạng thái Exchanged
  const receivedCountQuery = useOrderStatusCountQuery({
    startDate: startDate,
    endDate: finishDate,
    status: "received",
  });

  const exchangedCountQuery = useOrderStatusCountQuery({
    startDate: startDate,
    endDate: finishDate,
    status: "Exchanged",
  });

  useEffect(() => {
    if (receivedCountQuery?.data && exchangedCountQuery?.data) {
      const receivedTotal = receivedCountQuery.data.total || 0;
      const exchangedTotal = exchangedCountQuery.data.total || 0;
      setTotal(receivedTotal + exchangedTotal);
    } else {
      setTotal(0);
    }
  }, [startDate, finishDate, receivedCountQuery.data, exchangedCountQuery.data]);


    //   const orderCountQuery = useOrderStatusCountQuery({startDate:startDate,endDate:finishDate,status:"received"})
    // useEffect(()=>{
    //   if(orderCountQuery?.data){
    //     setTotal(orderCountQuery?.data?.total)
    //   }else{
    //     setTotal(0)
    //   }
    // },[startDate,finishDate,orderCountQuery.data])
      return (
        <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm shadow-green-600 rounded-xl">
          <div className="p-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-green-600 dark:text-gray-100 mb-2">Đơn hàng hoàn thành</h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div> */}
            <div className="flex items-start">
              <div className="text-xl font-bold text-green-600 dark:text-gray-100 mr-2">{total}</div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div> */}
            </div>
          </div>
        </div>
      );
  }

  export default DashboardCard03