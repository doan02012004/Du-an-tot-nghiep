import { useEffect, useState } from "react";
import useUserDashBoard from "../../../../common/hooks/dashboard/useUserDashBoard";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../../../../common/utils/product";

interface Itopuser {
  totalOrders:number,
  totalSpent:number,
  userInfo:{
    firstname:string,
    lastname:string,
    email:string,
    city:string
  },
  userId:string
}

const TableTopUser = () => {
  const [topUser,setTopUser] = useState<Itopuser[]>([])
  const [searchParams,] = useSearchParams()
  const startDate = searchParams.get('startDate') 
  const finishDate = searchParams.get('finishDate')
  const topUserQuery = useUserDashBoard({startDate:startDate,endDate:finishDate,type:'top'})
  useEffect(()=>{
    if(topUserQuery.data){
      if(topUserQuery.data?.users?.length > 0){
        setTopUser(topUserQuery.data?.users)
      }else{
        setTopUser([])
      }
    }
  },[finishDate,startDate,topUserQuery?.data])

    
      return (
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
          <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Khách hàng mua nhiều nhất</h2>
          </header>      
          <div className="p-3">
    
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Spent</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Country</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {
                    topUser.map((customer:Itopuser,index:number) => {
                      return (
                        <tr key={customer.userId}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                <img className="rounded-full" src={`https://picsum.photos/id/${30 + index}/300/300`} width="40" height="40" alt={customer.userInfo.lastname} />
                              </div>
                              <div className="font-medium text-gray-800 dark:text-gray-100">{`${customer.userInfo.firstname} ${customer.userInfo.lastname}`}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{customer.userInfo.email}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">{formatPrice(customer.totalSpent)}đ</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center">{customer.userInfo.city}</div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
    
            </div>
    
          </div>
        </div>
      );
}

export default TableTopUser