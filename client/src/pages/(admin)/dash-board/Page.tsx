/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker } from "antd"
import DashboardCard01 from "./_components/DashboardCard01"
import BarChartCard from "./_components/BarChartCard"
import PieChartCard from "./_components/PieChartCard"
import TableTopUser from "./_components/TableTopUser"
import TableTopProduct from "./_components/TableTopProduct"
import { useState } from "react"
import moment from "moment"
import { useSearchParams } from "react-router-dom"





const DashBoardPage = () => {
  const [searchParams,setSearchParams] = useSearchParams()
   const [finishDate, setFinishDate] = useState<Date|any>(moment()); 
   const [startDate, setStartDate] = useState<Date|any>(moment().subtract(1, 'month')); 
   const onSubmit = ()=>{
    const start = startDate.toISOString()
    const finish = finishDate.toISOString()
    searchParams.set('startDate',start)
    searchParams.set('finishDate',finish)
    setSearchParams(searchParams)
    // Thực hiện truy vấn MongoDB hoặc logic lọc tại đây
    console.log("Lọc từ ngày:", start, "đến ngày:", finish);
   }
  return (
    <>
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

          <div className="flex items-center gap-x-2">
            <h1>Từ:</h1>
            <DatePicker
             defaultValue={startDate} 
             onChange={(date) => setStartDate(date)} 
            />
          </div>
          <div className="flex items-center gap-x-2">
            <h1>Đến:</h1>
            <DatePicker 
             defaultValue={finishDate} 
             onChange={(date) => setFinishDate(date)} 
            />
          </div>
          <Button onClick={onSubmit} className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Add View</Button>

        </div>

      </div>
      <div className="grid grid-cols-12 gap-6 overflow-y-auto h-[500px] py-4" >
        <DashboardCard01 />
        <DashboardCard01 />
        <DashboardCard01 />
        <DashboardCard01 />
        <BarChartCard />
        <PieChartCard />
        <TableTopUser />
        <TableTopProduct />
      </div>

    </>
  )
}

export default DashBoardPage