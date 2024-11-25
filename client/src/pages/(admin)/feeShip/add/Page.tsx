import { Button, Form, Input, Tabs, TabsProps } from "antd"
import { useState } from "react";
import { Link } from "react-router-dom"
import { IVolumeRate, IWeightRate } from "../../../../common/interfaces/ship";
import FormWeightItem from "./_components/FormWeightItem";
import { PlusCircleFilled } from "@ant-design/icons";
import FormVolumeItem from "./_components/FormVolumeItem";
import useShipMutation from "../../../../common/hooks/ships/useShipMutation";


const AddShipPage = () => {
    const [typeShip, setTypeShip] = useState<string>('')
    const [weights, setWeights] = useState<IWeightRate[]>([])
    const [volumes, setVolumes] = useState<IVolumeRate[]>([])

    const shipMutation = useShipMutation();
    const onAddNewWeight = () => {
        setWeights([...weights, { maxWeight: 0, minWeight: 0, price: 0,check:false }])
    }
    const onAddNewVolume = () => {
        setVolumes([...volumes, { maxVolume: 0, minVolume: 0, price: 0,check:false }])
    }

    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Cân nặng',
            children: (
                <>
                    <Button onClick={onAddNewWeight} className="mb-4">Add new</Button>
                    <div className="grid grid-cols-12 gap-6 py-4 px-4 h-80 overflow-y-scroll">
                        {weights?.map((weight:IWeightRate,index:number) => (
                             <FormWeightItem key={index} index={index} weight={weight} weights={weights} setWeights={setWeights} />
                        ))}
                    </div>
                </>
            ),
        },
        {
            key: '2',
            label: 'Thể tích',
            children: (
                <>
                    <Button onClick={onAddNewVolume} className="mb-4">Add new</Button>
                    <div className="grid grid-cols-12 gap-6 py-4 px-4 h-80 overflow-y-scroll">
                        {volumes?.map((volume:IVolumeRate,index:number) => (
                             <FormVolumeItem key={index} index={index} volume={volume} volumes={volumes} setVolumes={setVolumes} />
                        ))}
                    </div>
                </>
            ),
        },
    ];
   const onCreateShip = () =>{
    const newShip = {
        nameBrand:typeShip,
        weight:weights,
        volume:volumes
    }
    shipMutation.mutate({action:"add",newShip})
   }
    return (
        <>
            <div className="overflow-x-hidden h-full ">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold text-xl">THÊM VOUCHER</h1>
                    <Link to={`/admin/ships`}>

                        <Button type="primary">Quay lại</Button>
                    </Link>
                </div>
                <div className="flex gap-x-3 pb-5 border-b border-b-gray-300 w-full">
                    <div className=" w-full">
                        <h5>Loại vận chuyển</h5>
                        <Input onChange={(e) => setTypeShip(e.target.value)} className="w-full basis-10/12" />
                    </div>
                    {
                        typeShip !==''&& !weights.some((weight) => weight.check == false) &&
                        !volumes.some((volume) => volume.check == false) &&
                        <Button className="m-0 self-end " onClick={onCreateShip} ><PlusCircleFilled /> Create</Button>
                    }
                </div>

            </div>
            <Tabs defaultActiveKey="1" items={tabs} />
        </>

    )
}

export default AddShipPage