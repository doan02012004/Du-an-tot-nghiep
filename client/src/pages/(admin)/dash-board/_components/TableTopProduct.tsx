import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useProductDashboard from "../../../../common/hooks/dashboard/useProductDashboard"
import { Igallery } from "../../../../common/interfaces/product"
import { formatPrice } from "../../../../common/utils/product"
interface Itopproduct {
  productId:string,
  _id:string,
  totalQuantitySold:number,
  totalRevenue:number,
  productInfo:{
    name:string,
    gallerys:Igallery[],
  },
  categoryInfo:{
    name:string,
    slug:string,
  },
}

const TableTopProduct = () => {
  const [topProducts,setTopProducts] = useState<Itopproduct[]>([])
  const [searchParams,] = useSearchParams()
  const startDate = searchParams.get('startDate') 
  const finishDate = searchParams.get('finishDate')
  const topProductQuery = useProductDashboard({startDate:startDate,endDate:finishDate})
  useEffect(()=>{
    if(topProductQuery.data){
      if(topProductQuery.data?.products?.length > 0){
        setTopProducts(topProductQuery.data?.products)
      }else{
        setTopProducts([])
      }
    }
  },[finishDate,startDate,topProductQuery])

    
      return (
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
          <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Sản phẩm</h2>
          </header>      
          <div className="p-3">
    
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Tên sp</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Danh mục</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">SL bán</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Tổng thu</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {
                    topProducts.map((customer:Itopproduct) => {
                      return (
                        <tr key={customer?._id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                <img className="rounded-full" src={customer?.productInfo?.gallerys[0]?.avatar} width="40" height="40" alt={customer?.productInfo?.name} />
                              </div>
                              <div className="font-medium text-gray-800 dark:text-gray-100">{customer?.productInfo?.name}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{customer.categoryInfo.name}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">{customer.totalQuantitySold}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center">{formatPrice(customer?.totalRevenue)}đ</div>
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

export default TableTopProduct