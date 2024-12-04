import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useNewComplaintsCountQuery from "../../../../common/hooks/dashboard/useNewComplaintsCountQuery"
import { Button } from "antd"
import { RightOutlined } from "@ant-design/icons"

type Props = {}

const DashboardCard05 = (props: Props) => {
  const [total,setTotal] = useState<number>(0)
      const [searchParams,] = useSearchParams()
      const startDate = searchParams.get('startDate') 
      const finishDate = searchParams.get('finishDate')
      const navigate = useNavigate()
      const Complaints = useNewComplaintsCountQuery({startDate:startDate,endDate:finishDate})
      useEffect(()=>{
        if(Complaints?.data){
          setTotal(Complaints?.data?.total)
        }else{
          setTotal(0)
        }
      },[startDate,finishDate,Complaints.data])
      console.log(total)
  return (
    <div className='flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm shadow-purple-600 rounded-xl border border-black'>
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-purple-600 dark:text-gray-100 mb-2">Khiếu nại mới</h2>
          {total>0 && (<Button onClick={()=>navigate('/admin/complaint')}><RightOutlined /></Button>)}
        </header>
        {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div> */}
        <div className="flex items-start">
          <div className="text-xl font-bold text-purple-600 dark:text-gray-100 mr-2">{total}</div>
          {/* <div className="text-sm font-medium text-yellow-700 px-1.5 bg-yellow-500/20 rounded-full">+49%</div> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard05;
