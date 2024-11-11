import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function DashboardCard01() {
  const [searchParams,] = useSearchParams()
  const startDate = searchParams.get('startDate')
  const finishDate = searchParams.get('finishDate')
 useEffect(()=>{
  
 },[startDate,finishDate])
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm shadow-gray-500 rounded-xl">
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Doanh Thu</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">$24,780</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
