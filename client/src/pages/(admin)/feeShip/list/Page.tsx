/* eslint-disable @typescript-eslint/no-explicit-any */
import {  DeleteOutlined, EditOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IShip, IVolumeRate, IWeightRate } from '../../../../common/interfaces/ship';
import useShipQuery from '../../../../common/hooks/ships/useShipQuery';
import { formatPrice } from '../../../../common/utils/product';

const ListShipPage = () => {
    const [ships, setShips] = useState<IShip[]>([])
    const [ship, setShip] = useState<IShip>({ _id: '', nameBrand: '', weight: [], volume: [] })
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const shipQuery = useShipQuery({})

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const startDragging = (event: any) => {
            isDragging = true;
            startX = event.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        };

        const whileDragging = (event: any) => {
            if (!isDragging) return;
            event.preventDefault();
            const x = event.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1;
            scrollContainer.scrollLeft = scrollLeft - walk;
        };

        const stopDragging = () => {
            isDragging = false;
        };

        scrollContainer.addEventListener("mousedown", startDragging);
        scrollContainer.addEventListener("mousemove", whileDragging);
        scrollContainer.addEventListener("mouseup", stopDragging);
        scrollContainer.addEventListener("mouseleave", stopDragging);

        return () => {
            scrollContainer.removeEventListener("mousedown", startDragging);
            scrollContainer.removeEventListener("mousemove", whileDragging);
            scrollContainer.removeEventListener("mouseup", stopDragging);
            scrollContainer.removeEventListener("mouseleave", stopDragging);
        };
    }, []);
    useEffect(() => {
        if (shipQuery?.data?.length > 0) {
            // const newShips =  shipQuery.data?.map((item:IShip) =>{
            //     const newWeights = item.weight.map((weight:IWeightRate,index:number) => Number(index) == Number( item.weight.length-1) ?{...item.weight[index],maxWeight:Infinity}:weight)
            //     const newVolumes = item.volume.map((volume:IVolumeRate,index:number) => Number(index) == Number(item.volume.length-1) ?{...item.volume[index],maxVolume:Infinity}:volume)
            //     return ( {
            //         ...item,
            //         weight:newWeights,
            //         volume:newVolumes
            //     })
            // })
            // console.log(newShips)
            setShips(shipQuery.data)

            if (ship._id == '') {
                setShip(shipQuery.data[0])
            }
        }
    }, [shipQuery?.data])
    return (
        <div className="container">
            <h2 className="text-2xl mb-4">Quản lý phí ship</h2>
            <div className="relative flex items-center border rounded-lg bg-slate-100 p-2 mb-6">
                <div
                    ref={scrollContainerRef}
                    className="scroll-container cursor-grab"
                    style={{ userSelect: "none" }}
                >
                    {ships?.map((item: IShip) => (
                        <div key={item._id} className={`button border border-gray-400 rounded-md overflow-hidden ${ship?._id == item._id && 'bg-blue *:text-white'}`}>
                            <Button
                                className="w-full bg-transparent border-none rounded-none"
                                icon={<TagOutlined />}
                                onClick={() => setShip(item)}
                            >
                                {item?.nameBrand}
                            </Button>
                        </div>

                    ))}


                </div>
                <div className="add-button">
                    <Link to={`/admin/ships/add`}><Button icon={<PlusOutlined />} /></Link>
                </div>
            </div>
            <div className=' grid grid-cols-12 gap-6'>
                <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
                    <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Khối lượng</h2>
                    </header>
                    <div className="p-3">
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                {/* Table header */}
                                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Khối lượng (Min)</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Khối lượng (Max)</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Giá vận chuyển</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Thao tác</div>
                                        </th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                                    {
                                        ship?.weight?.map((item: IWeightRate) => {
                                            return (
                                                <tr key={item?._id}>

                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">{item.minWeight}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">{item.maxWeight}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-sm text-center">{formatPrice(item.price ? item.price : 0)}đ</div>
                                                    </td>
                                                    <td className='flex gap-2'>
                                                        <Button type='primary'>
                                                            <EditOutlined></EditOutlined>
                                                        </Button>
                                                        <Button type="dashed">
                                                            <DeleteOutlined></DeleteOutlined>
                                                        </Button>
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
                <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
                    <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Thể tích</h2>
                    </header>
                    <div className="p-3">
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                {/* Table header */}
                                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Thể tích (Min)</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Thể tích (Max)</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Giá vận chuyển</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Thao tác</div>
                                        </th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                                    {
                                        ship?.volume?.map((item: IVolumeRate) => {
                                            return (
                                                <tr key={item?._id}>

                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">{item.minVolume}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">{item.maxVolume}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-sm text-center">{formatPrice(item.price ? item.price : 0)}đ</div>
                                                    </td>
                                                    <td className='flex gap-2'>
                                                        <Button type='primary'>
                                                            <EditOutlined></EditOutlined>
                                                        </Button>
                                                        <Button type="dashed">
                                                            <DeleteOutlined></DeleteOutlined>
                                                        </Button>
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
            </div>
        </div>
    )
}

export default ListShipPage