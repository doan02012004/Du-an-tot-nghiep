import ShipModel from "../models/shipModel.js";

export const getAllShip = async (req, res) => {
    try {
        const ships = await ShipModel.find();
        return res.status(200).json(ships);
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
// export const getAllShipAdmin = async (req, res) => {
//     try {
//         const ships = await ShipModel.find();
//         // const newShips = ships.map((item) =>{
//         //     const newWeights = item.weight.map((item,index) => index == weight.length -1 ?{...weight[index],maxWeight:Infinity}:item)
//         //     const newVolumes = item.volume.map((item,index) => index == volume.length -1 ?{...volume[index],maxVolume:Infinity}:item)
//         //     return {
//         //         ...item,
//         //         weight:newWeights,
//         //         volume:newVolumes
//         //     }
//         // })
//         return res.status(200).json(ships);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }


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
export const updateWeightRate = async (req, res) => {
    const { shipId, weightId } = req.params;
    const { minWeight, maxWeight, price } = req.body;

    try {
        // Tìm tàu bằng shipId
        const ship = await ShipModel.findById(shipId);
        if (!ship) {
            return res.status(404).json({ message: 'Không tìm thấy tàu này' });
        }

        // Tìm weightRate trong array weights
        const weightRate = ship.weight.id(weightId);
        if (!weightRate) {
            return res.status(404).json({ message: 'Không tìm thấy phí khối lượng này' });
        }

        // Cập nhật giá trị cho weightRate
        if (minWeight !== undefined && minWeight !== null) {
            weightRate.minWeight = minWeight;
        }
        if (maxWeight !== undefined && maxWeight !== null) {
            weightRate.maxWeight = maxWeight;
        }
        if (price !== undefined && price !== null) {
            weightRate.price = price;
        }

        // Lưu lại thay đổi
        await ship.save();

        // Trả về thông tin tàu đã được cập nhật
        res.status(200).json({
            message: 'Cập nhật phí khối lượng thành công',
            updatedShip: ship // Trả về đối tượng ship đã được cập nhật
        });
    } catch (err) {
        console.error(err); // Log lỗi chi tiết
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật phí khối lượng', error: err.message });
    }
};


// Cập nhật phí thể tích
export const updateVolumeRate = async (req, res) => {
    const { shipId, volumeId } = req.params;
    const { minVolume, maxVolume, price } = req.body;

    try {
        // Tìm tàu bằng shipId
        const ship = await ShipModel.findById(shipId);
        if (!ship) {
            return res.status(404).json({ message: 'Không tìm thấy tàu này' });
        }

        // Tìm volumeRate trong array volumes
        const volumeRate = ship.volume.id(volumeId);
        if (!volumeRate) {
            return res.status(404).json({ message: 'Không tìm thấy phí thể tích này' });
        }

        // Cập nhật giá trị cho volumeRate
        if (minVolume !== undefined && minVolume !== null) {
            volumeRate.minVolume = minVolume;
        }
        if (maxVolume !== undefined && maxVolume !== null) {
            volumeRate.maxVolume = maxVolume;
        }
        if (price !== undefined && price !== null) {
            volumeRate.price = price;
        }

        // Lưu lại thay đổi
        await ship.save();

        // Trả về thông tin tàu đã được cập nhật
        res.status(200).json({
            message: 'Cập nhật phí thể tích thành công',
            updatedShip: ship // Trả về đối tượng ship đã được cập nhật
        });
    } catch (err) {
        console.error(err); // Log lỗi chi tiết
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật phí thể tích', error: err.message });
    }
};



export const deleteWeight = async (req, res) => {
    const { id } = req.params; // ID của weight cần xóa
    const { shipId } = req.body; // ID của ship

    try {
        const ship = await ShipModel.findById(shipId);

        if (!ship) {
            return res.status(404).json({ message: 'Ship không tồn tại' });
        }

        // Xóa weight trong mảng weight
        const updatedWeights = ship.weight.filter((weight) => weight._id.toString() !== id);
        ship.weight = updatedWeights;

        await ship.save();
        return res.status(200).json({ message: 'Xóa khối lượng thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi xóa khối lượng' });
    }
};

// Xóa volume
export const deleteVolume = async (req, res) => {
    const { id } = req.params; // ID của volume cần xóa
    const { shipId } = req.body; // ID của ship

    try {
        const ship = await ShipModel.findById(shipId);

        if (!ship) {
            return res.status(404).json({ message: 'Ship không tồn tại' });
        }

        // Xóa volume trong mảng volume
        const updatedVolumes = ship.volume.filter((volume) => volume._id.toString() !== id);
        ship.volume = updatedVolumes;

        await ship.save();
        return res.status(200).json({ message: 'Xóa thể tích thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi xóa thể tích' });
    }
};


export const removeBranch = async (req, res) => {
    const { id } = req.params;
    try {
        const branchId = await ShipModel.findByIdAndDelete(id)
        if (!branchId) {
            console.log("Nó không tồn tại")
        }
        return res.status(200).json({
            message: 'Xóa phương thức vận chuyển thành công',
            data: ShipModel,
        });
    } catch (error) {
        console.log("lỗi không thể xóa branch", message.error)
    }
}


export const priceRangeWeight = async (req, res) => {
    try {
        const { shipMethodId, minWeight = 0, maxWeight = 0, price = 0 } = req.body;

        if (!shipMethodId) {
            return res.status(400).json({ message: "Thiếu shipMethodId!" });
        }

        // Tạo khoảng giá mới
        const newRate = { minWeight, maxWeight, price };

        // Tìm phương thức vận chuyển theo ID
        const ship = await ShipModel.findById(shipMethodId);
        if (!ship) {
            return res.status(404).json({ message: "Không tìm thấy phương thức vận chuyển!" });
        }

        // Thêm khoảng giá mới vào mảng weight
        ship.weight.push(newRate);
        await ship.save();

        // Trả về khoảng giá vừa thêm
        return res.status(201).json(newRate);
    } catch (error) {
        console.error("Error adding weight rate:", error);
        return res.status(500).json({ message: "Lỗi khi thêm khoảng giá theo trọng lượng" });
    }
};


export const priceRangeVolume = async (req, res) => {
    try {
        const { shipMethodId, minVolume = 0, maxVolume = 0, price = 0 } = req.body;

        if (!shipMethodId) {
            return res.status(400).json({ message: "Thiếu shipMethodId!" });
        }

        // Tạo khoảng giá mới
        const newVolumeRate = { minVolume, maxVolume, price };

        // Tìm phương thức vận chuyển theo ID
        const ship = await ShipModel.findById(shipMethodId);
        if (!ship) {
            return res.status(404).json({ message: "Không tìm thấy phương thức vận chuyển!" });
        }

        // Thêm khoảng giá mới vào mảng volume
        ship.volume.push(newVolumeRate);
        await ship.save();

        // Trả về khoảng giá vừa thêm
        return res.status(201).json(newVolumeRate);
    } catch (error) {
        console.error("Error adding volume rate:", error);
        return res.status(500).json({ message: "Lỗi không thể thêm khoảng giá" });
    }
};
