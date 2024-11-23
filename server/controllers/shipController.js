export const getAllShipOptions = async (req, res) => {
    try {
        const ship = await shipModel.find();
        res.status(200).json(ship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getShipById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipById = await shipModel.findById(id);
        if (!shipById) {
            return res.status(404).json({ message: 'Phương thức vận chuyển không tồn tại' });
        }
        res.status(200).json(shipById);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createShip = async (req, res) => {
    try {
        const { nameBrand, weightRates, volumeRates } = req.body;
        const newShip = new shipModel({
            nameBrand,
            weightRates,
            volumeRates
        });
        await newShip.save();
        res.status(200).json(newShip);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateShip = async (req, res) => {
    try {
        const { id } = req.params;
        const { nameBrand, weightRates, volumeRates } = req.body;

        const updateShip = await shipModel.findByIdAndUpdate(id, { nameBrand, weightRates, volumeRates }, { new: true })
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
