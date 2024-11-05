/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useRef, useState } from 'react'
import {Chart,LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip} from 'chart.js';
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);
const DashboardCard02 = () => {
    const [chart, setChart] = useState<any>(null)
    const canvas = useRef<any>(null);
    useEffect(() => {
        const ctx = canvas.current;
        // eslint-disable-next-line no-unused-vars
        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
              {
                label: 'Doanh số',
                data: [30, 40, 25, 50],
                borderColor: 'rgb(75, 192, 192)'
              }
            ]
          },
          options:{ responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }}
        });
        setChart(newChart);
        return () => newChart.destroy();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  return (
    <div className='col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm shadow-gray-500 rounded-xl'>
        <canvas ref={canvas} width={595} height={248}></canvas>
    </div>
  )
}

export default DashboardCard02