import ShipModel from "../models/shipModel.js";

export const getAllShipClient = async (req, res) => {
    try {
        const ships = await ShipModel.find();
        const newShips = await ships.map((item) =>{
            const newItem = item.toObject()
            const weightLength = item.weight.length
            const volumeLength = item.volume.length
            const newWeights = newItem.weight.map((item,index) => Number(index) == Number(weightLength-1) ?{...newItem.weight[index],maxWeight:Infinity}:item)
            const newVolumes = newItem.volume.map((item,index) => Number(index) == Number(volumeLength-1) ?{...newItem.volume[index],maxVolume:Infinity}:item)
            return ( {
                ...item,
                weight:newWeights,
                volume:newVolumes
            })
        })
        console.log(newShips)
       return res.status(200).json({max:Infinity});
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
}

export const getShipById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipById = await ShipModel.findById(id);
        if (!shipById) {
            return res.status(404).json({ message: 'Phương thức vận chuyển không tồn tại' });
        }
        res.status(200).json(shipById);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getAllShipAdmin = async (req, res) => {
    try {
        const ships = await ShipModel.find();
        // const newShips = ships.map((item) =>{
        //     const newWeights = item.weight.map((item,index) => index == weight.length -1 ?{...weight[index],maxWeight:Infinity}:item)
        //     const newVolumes = item.volume.map((item,index) => index == volume.length -1 ?{...volume[index],maxVolume:Infinity}:item)
        //     return {
        //         ...item,
        //         weight:newWeights,
        //         volume:newVolumes
        //     }
        // })
       return res.status(200).json(ships);
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
}


export const createShip = async (req, res) => {
    try {
        const { nameBrand, weight, volume } = req.body;

       const newShip = {
        nameBrand,
        weight,
        volume
       }
       const ship = await ShipModel.create(newShip)
        return res.status(200).json(ship);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateShip = async (req, res) => {
    try {
        const { id } = req.params;
        const { nameBrand, weightRates, volumeRates } = req.body;

        const updateShip = await ShipModel.findByIdAndUpdate(id, { nameBrand, weightRates, volumeRates }, { new: true })
        if (!updatedShipOption) {
            return res.status(404).json({ message: 'Phương thức vận chuyển không tồn tại' });
        }

        return res.status(200).json(updateShip);
    } catch (error) {
        return res.status(500).json({ message: message.error });
    }
}


export const deleteShip = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedShipOption = await Ship.findByIdAndDelete(id);

        if (!deletedShipOption) {
            return res.status(404).json({ message: 'Phương thức vận chuyển không tồn tại' });
        }

        res.status(200).json({ message: 'Đã xóa phương thức vận chuyển thành công' });

    } catch (error) {
        return res.status(500).json({ message: message });
    }
}
