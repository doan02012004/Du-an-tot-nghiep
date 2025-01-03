/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

// import { setTotalCart } from "../../../../common/redux/features/cartSlice"
import { IcartItem } from "../../../../common/interfaces/cart"
import { IshipItem, IshipSubmit, VolumeRange, WeightRange } from "../../../../common/interfaces/orderInterfaces"
import { useSelector } from "react-redux";
import { IShip, IVolumeRate, IWeightRate } from "../../../../common/interfaces/ship";
import useShipQuery from "../../../../common/hooks/ships/useShipQuery";
type Props = {
    onShippingCostChange: (ship: IshipSubmit) => void;

};

const OrderOptionShip = ({ onShippingCostChange }: Props) => {
    const [ship, setShip] = useState<IshipItem | null>(null);
    const [ships, setShips] = useState<IShip[]>([])
    const carts = useSelector((state: any) => state.cart.carts);
    const shipQuery = useShipQuery({})

    // chọn phương thức giao hàng
    const handleShipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedShip = ships.find(option => option.nameBrand === e.target.value) as IshipItem;
        setShip(selectedShip);
    };

    useEffect(() => {
        if (carts.length > 0 && ship) {
            const sumWeight = carts.reduce((sum: number, cart: IcartItem) => sum + cart.weight, 0);
            const sumVolume = carts.reduce((sum: number, cart: IcartItem) => sum + cart.volume, 0);
            const weightCost = ship.weight.find(range => sumWeight >= range.minWeight && sumWeight <= range.maxWeight) as WeightRange;
            const volumeCost = ship.volume.find(range => sumVolume >= range.minVolume && sumVolume <= range.maxVolume) as VolumeRange;
            if (weightCost?.price > volumeCost?.price) {
                const shipWeight = {
                    nameBrand: ship.nameBrand,
                    value: weightCost,
                } as IshipSubmit
                onShippingCostChange(shipWeight);
            } else {
                const shipVolume = {
                    nameBrand: ship.nameBrand,
                    value: volumeCost,
                } as IshipSubmit
                onShippingCostChange(shipVolume);
            }
            // const shippingCost = calculateShippingCost(ship, sumWeight, sumVolume);
            // onShippingCostChange(shippingCost); // Thông báo phí vận chuyển đến component cha
            // console.log(shippingCost);
        }
    }, [carts, ship]);

    useEffect(() => {
        if (shipQuery?.data?.length > 0) {
            const newShips =  shipQuery.data?.map((item:IShip) =>{
                const newWeights = item.weight.map((weight:IWeightRate,index:number) => Number(index) == Number( item.weight.length-1) ?{...item.weight[index],maxWeight:Infinity}:weight)
                const newVolumes = item.volume.map((volume:IVolumeRate,index:number) => Number(index) == Number(item.volume.length-1) ?{...item.volume[index],maxVolume:Infinity}:volume)
                return ( {
                    ...item,
                    weight:newWeights,
                    volume:newVolumes
                })
            })
            setShips(newShips)

            if (!ship) {
                setShip(newShips[0])
            }
        }
    }, [shipQuery?.data])

    return (
        <div className="py-6">
            <span className="text-lg lg:text-xl text-black font-semibold">Phương thức giao hàng</span>
            <div className="my-4 border rounded-tl-[30px] rounded-br-[30px] px-5 py-6 lg:py-8 lg:px-10">
                <select
                    className="w-full p-3 border rounded-lg text-black text-sm lg:text-base font-semibold"
                    onChange={handleShipChange}
                >
                    {ships?.map((option) => (
                        <option key={option.nameBrand} value={option.nameBrand}>
                            {option.nameBrand}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default OrderOptionShip;