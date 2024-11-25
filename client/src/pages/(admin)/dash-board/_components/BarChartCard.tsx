/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useRevenueQuery from '../../../../common/hooks/dashboard/useRevenueQuery';
import { formatPrice } from '../../../../common/utils/product';

interface dataRes {
    _id:string,
    month:number,
    year:number,
    totalRevenue:number
}
// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];
const BarChartCard = () => {
    const [dataMonth,setDataMonth] = useState([])
    const revenceQuery = useRevenueQuery({type:'month'})
    useEffect(()=>{
     if(revenceQuery?.data){
        if(revenceQuery?.data?.data?.length>0){
            const newData = revenceQuery?.data?.data.map((item:dataRes) =>{
                return {
                    ...item,
                    name:`Tháng ${item.month}`
                }
            })
            setDataMonth(newData)
        }else{
            setDataMonth([])
        }
     }else{
        if(dataMonth?.length>0){
            setDataMonth([])
        }
     }
    },[revenceQuery?.data])
    return (
        <div className={'col-span-6 shadow-lg shadow-gray-300 p-3 rounded-lg'}>
            <header className="flex justify-between items-start pb-3 border-b mb-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Biểu đồ doanh thu</h2>
            </header>
            <ResponsiveContainer width={"100%"} height={400} >
                <BarChart
                    width={500}
                    height={350}
                    data={dataMonth}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatPrice} />
                    <Tooltip  formatter={(value:number) => `${formatPrice(value)} đ`}  />
                    {/* <Legend /> */}
                    <Bar dataKey="totalRevenue" name={'Tổng doanh thu'}  fill="#1E90FF" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}

export default BarChartCard