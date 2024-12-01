import { DeleteOutlined, EditOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import useShipMutation from '../../../../common/hooks/ships/useShipMutation';
import useShipQuery from '../../../../common/hooks/ships/useShipQuery';
import { IShip, IVolumeRate, IWeightRate } from '../../../../common/interfaces/ship';
import { formatPrice } from '../../../../common/utils/product';
import { addVolumeRate, addWeigtRate, deleteVolume, deleteWeight, removeBranch, updateVolumeRate, updateWeightRate } from '../../../../services/ship';
import FormUpdate from './_components/FormUpdate';

const ListShipPage = () => {
    const [ships, setShips] = useState<IShip[]>([]);
    const [ship, setShip] = useState<IShip>({ _id: '', nameBrand: '', weight: [], volume: [] });
    const [, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const shipQuery = useShipQuery({});
    // const mutationShip = useShipMutation();

    const [isModalVisible, setIsModalVisible] = useState(false); // đóng mở form update
    const [selectedRate, setSelectedRate] = useState<IWeightRate | IVolumeRate | null>(null);
    const [rateType, setRateType] = useState<'weight' | 'volume'>('weight');


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


    // Hàm sắp xếp tự động theo maxWeight
    const sortWeightRates = (weights: IWeightRate[]) => {
        return weights.sort((a, b) => {
            if (a.maxWeight !== b.maxWeight) {
                return a.maxWeight - b.maxWeight; // Sắp xếp theo maxWeight tăng dần
            }
            return (a.price || 0) - (b.price || 0); // Nếu maxWeight bằng nhau, sắp xếp theo giá tăng dần
        });
    };

    // Hàm sắp xếp tự động theo maxVolume
    const sortVolumeRates = (volumes: IVolumeRate[]) => {
        return volumes.sort((a, b) => {
            if (a.maxVolume !== b.maxVolume) {
                return a.maxVolume - b.maxVolume; // Sắp xếp theo maxVolume tăng dần
            }
            return (a.price || 0) - (b.price || 0); // Nếu maxVolume bằng nhau, sắp xếp theo giá tăng dần
        });
    };

    useEffect(() => {
        if (shipQuery?.data?.length > 0) {
            const sortedShips = shipQuery.data.map((shipItem: IShip) => ({
                ...shipItem,
                weight: sortWeightRates(shipItem.weight || []), // Sắp xếp khối lượng theo maxWeight
                volume: sortVolumeRates(shipItem.volume || []), // Sắp xếp thể tích theo maxVolume
            }));
            setShips(sortedShips);
            if (ship._id === '') {
                setShip(sortedShips[0]);
            }
        }
    }, [shipQuery?.data]);

    // Thêm khoảng giá weight
    const handleAddWeightRate = async () => {
        const newWeightRate: IWeightRate = {
            shipMethodId: ship._id,  // Gửi kèm ID phương thức vận chuyển
            minWeight: 0,
            maxWeight: 0,
            price: 0
        };

        try {
            const createdRate = await addWeigtRate(newWeightRate);

            if (createdRate) {
                // Nếu thêm thành công, cập nhật danh sách
                const updatedWeights = [...ship.weight, createdRate];
                setShip({ ...ship, weight: updatedWeights });
                window.location.reload();
            }
        } catch (error) {
            console.error("Lỗi khi thêm khoảng giá weight:", error);
        }
    };

    // Thêm khoảng giá volume
    const handleAddVolumeRate = async () => {
        const newVolumeRate: IVolumeRate = {
            shipMethodId: ship._id,  // Gửi kèm ID phương thức vận chuyển
            minVolume: 0,
            maxVolume: 0,
            price: 0
        };

        try {
            const createdRate = await addVolumeRate(newVolumeRate);

            if (createdRate) {
                // Nếu thêm thành công, cập nhật danh sách
                const updatedVolumes = [...ship.volume, createdRate];
                setShip({ ...ship, volume: updatedVolumes });
                window.location.reload();
            }
        } catch (error) {
            console.error("Lỗi khi thêm khoảng giá volume:", error);
        }
    };




    const handleDeleteWeight = async (weightId: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa khoản phí này?',
            onOk: async () => {
                try {
                    await deleteWeight(ship._id, weightId);
                    const updatedShip = { ...ship };
                    updatedShip.weight = updatedShip.weight.filter((w) => w._id !== weightId);
                    setShip(updatedShip);
                    window.location.reload();
                } catch (err) {
                    setError('Không thể xóa weight');
                    message.error('Có lỗi xảy ra khi xóa');
                }
            }
        });
    };

    const handleDeleteVolume = async (volumeId: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa khoản phí này?',
            onOk: async () => {
                try {
                    await deleteVolume(ship._id, volumeId);
                    const updatedShip = { ...ship };
                    updatedShip.volume = updatedShip.volume.filter((v) => v._id !== volumeId);
                    setShip(updatedShip);
                    window.location.reload();
                } catch (err) {
                    setError('Không thể xóa volume');
                    message.error('Có lỗi xảy ra khi xóa');
                }
            }
        });
    };

    const handleEditWeightRate = (rate: IWeightRate) => {
        setSelectedRate(rate);
        setRateType('weight');
        setIsModalVisible(true);
    };

    const handleEditVolumeRate = (rate: IVolumeRate) => {
        setSelectedRate(rate);
        setRateType('volume');
        setIsModalVisible(true);
    };

    const handleSave = async (updatedRate: IWeightRate | IVolumeRate) => {
        try {
            // Cập nhật phí khối lượng
            if (rateType === 'weight') {
                const response = await updateWeightRate(ship?._id, updatedRate); // Gọi API để cập nhật
                console.log(response)
                if (response.status == 200) {
                    // Cập nhật lại ship state sau khi thành công
                    const updatedShip = { ...ship };
                    updatedShip.weight = updatedShip.weight.map((rate) =>
                        rate._id === updatedRate._id ? updatedRate : rate
                    );
                    setShip(updatedShip);
                    message.success('Cập nhật phí khối lượng thành công');
                    window.location.reload();

                } else {
                    message.error('Cập nhật phí khối lượng thất bại');
                }
            } else {
                // Cập nhật phí thể tích
                const response = await updateVolumeRate(ship?._id, updatedRate); // Gọi API để cập nhật
                if (response.status == 200) {
                    // Cập nhật lại ship state sau khi thành công
                    const updatedShip = { ...ship };
                    updatedShip.volume = updatedShip.volume.map((rate) =>
                        rate._id === updatedRate._id ? updatedRate : rate
                    );
                    setShip(updatedShip);
                    message.success('Cập nhật phí thể tích thành công');
                    window.location.reload();
                } else {
                    message.error('Cập nhật phí thể tích thất bại');
                }
            }

            // Đóng modal sau khi cập nhật thành công
            setIsModalVisible(false);
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật dữ liệu');
            console.error(error);
        }
    };

    const handleRemoveBranch = async (id: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa phương tiện này?',
            onOk: async () => {
                try {
                    await removeBranch(id); // Gọi API xóa sản phẩm trên server

                    // Cập nhật danh sách ships trong state
                    setShips((prevShips) => {
                        const updatedShips = prevShips.filter((ship) => ship._id !== id);

                        // Kiểm tra nếu ship hiện tại là ship vừa bị xóa
                        if (ship._id === id) {
                            setShip(updatedShips.length > 0 ? updatedShips[0] : { _id: '', nameBrand: '', weight: [], volume: [] });
                        }

                        return updatedShips;
                    });

                    message.success('Xóa thành công');
                } catch (err) {
                    setError('Không thể xóa phương tiện');
                    message.error('Có lỗi xảy ra khi xóa');
                }
            }
        });
    };




    return (
        <div className="container">
            <h2 className="text-2xl mb-4">Quản lý phí ship</h2>
            <div className="relative flex items-center border rounded-lg bg-slate-100 p-2 mb-6">
                <div ref={scrollContainerRef} className="scroll-container cursor-grab" style={{ userSelect: "none" }}>
                    {ships?.map((item: IShip) => (
                        <div key={item._id} className={`flex button border border-gray-400 rounded-md overflow-hidden ${ship?._id === item._id && 'bg-blue *:text-white'}`}>
                            <Button className="w-full bg-transparent border-none rounded-none" icon={<TagOutlined />} onClick={() => setShip(item)}>
                                {item?.nameBrand}
                            </Button>
                            <Button className='bg-transparent border-none rounded-none'
                                onClick={() => handleRemoveBranch(ship?._id)}
                            > Xóa</Button>
                        </div>
                    ))}
                </div>
                <div className="add-button">
                    <Link to={`/admin/ships/add`}><Button icon={<PlusOutlined />} /></Link>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
                    <header className="flex justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Khối lượng</h2>
                        <Button className="w-full" icon={<PlusOutlined />} onClick={() => handleAddWeightRate()}>
                            Thêm khoảng giá mới
                        </Button>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">Khối lượng (Min)</th>
                                        <th className="p-2 whitespace-nowrap">Khối lượng (Max)</th>
                                        <th className="p-2 whitespace-nowrap">Giá vận chuyển</th>
                                        <th className="p-2 whitespace-nowrap">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                                    {ship?.weight?.map((item: IWeightRate) => (
                                        <tr key={item?._id}>
                                            <td className="p-2 whitespace-nowrap">{item.minWeight}</td>
                                            <td className="p-2 whitespace-nowrap font-medium text-green-500">{item.maxWeight}</td>
                                            <td className="p-2 whitespace-nowrap text-center">{formatPrice(item.price ? item.price : 0)}đ</td>
                                            <td className="flex gap-2">
                                                <Button type="primary" onClick={() => handleEditWeightRate(item)}><EditOutlined /></Button>
                                                <Button type="dashed" onClick={() => handleDeleteWeight(item?._id)}><DeleteOutlined /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
                    <header className="flex justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Thể tích</h2>
                        <Button className="w-full" icon={<PlusOutlined />} onClick={() => handleAddVolumeRate()}>
                            Thêm khoảng giá mới
                        </Button>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">Thể tích (Min)</th>
                                        <th className="p-2 whitespace-nowrap">Thể tích (Max)</th>
                                        <th className="p-2 whitespace-nowrap">Giá vận chuyển</th>
                                        <th className="p-2 whitespace-nowrap">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                                    {ship?.volume?.map((item: IVolumeRate) => (
                                        <tr key={item?._id}>
                                            <td className="p-2 whitespace-nowrap">{item.minVolume}</td>
                                            <td className="p-2 whitespace-nowrap font-medium text-green-500">{item.maxVolume}</td>
                                            <td className="p-2 whitespace-nowrap text-center">{formatPrice(item.price ? item.price : 0)}đ</td>
                                            <td className="flex gap-2">
                                                <Button type="primary" onClick={() => handleEditVolumeRate(item)}><EditOutlined /></Button>
                                                <Button type="dashed" onClick={() => handleDeleteVolume(item?._id)}><DeleteOutlined /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <FormUpdate
                visible={isModalVisible}
                data={selectedRate}
                type={rateType}
                onSave={handleSave}
                onCancel={() => setIsModalVisible(false)}
            />
        </div>

    );
};

export default ListShipPage;
