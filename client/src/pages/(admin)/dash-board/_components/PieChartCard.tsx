/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useUserDashBoard from "../../../../common/hooks/dashboard/useUserDashBoard";

// const data = [
//     { name: "Group A", value: 400 },
//     { name: "Group B", value: 300 },
//     { name: "Group C", value: 300 },
//     { name: "Group D", value: 200 }
// ];

interface dataCity {
    name:string,
    value:number,
    _id:string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;


const PieChartCard = () => {
    const [dataCity,setDataCity] = useState<dataCity[]>([])
    const [searchParams,] = useSearchParams()
    const startDate = searchParams.get('startDate') 
    const finishDate = searchParams.get('finishDate')
    const userCityCountQuery = useUserDashBoard({startDate:startDate,endDate:finishDate,type:"city"})
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
    
            >
                <tspan x={x} dy="0">{`${(percent * 100).toFixed(0)}%`}</tspan> {/* Dòng đầu */}
                <tspan x={x} dy="1.2em">{dataCity[index].name}</tspan> {/* Dòng tiếp theo */}
            </text>
        );
    };
   useEffect(()=>{
    if(userCityCountQuery.data){
        if(userCityCountQuery.data?.data?.length > 0){
            setDataCity(userCityCountQuery.data?.data)
        }else{
          setDataCity([])
        }
      }
   },[startDate,finishDate,userCityCountQuery])
    return (
        <div className={'col-span-6 p-3 shadow-lg shadow-gray-300 rounded-lg'}>
            <header className="flex justify-between items-start pb-3 border-b mb-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Thống kê người dùng</h2>
            </header>
            <ResponsiveContainer width={"100%"} height={400}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={dataCity}
                        cx={270}
                        cy={180}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={170}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {dataCity?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <Tooltip />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartCard