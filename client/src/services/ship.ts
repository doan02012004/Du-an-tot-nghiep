import { IShip, IVolumeRate, IWeightRate } from './../common/interfaces/ship';
import { message } from "antd"
import instance from "../common/config/axios";


export const getAllShip = async () => {
    try {
        const res = await instance.get(`/ships`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}
// export const getAllShipAdmin = async () => {
//     try {
//         const res = await instance.get(`/ships/admin`)
//         return res.data
//     } catch (error) {
//         console.log(message.error('Lấy dữ liệu thất bại'));
//     }
// }
export const getShipById = async (id: string | number) => {
    try {
        const res = await instance.get(`/ships/${id}`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}

export const createShip = async (newShip?: IShip) => {
    try {
        const res = await instance.post(`/ships/add`, newShip)
        return res.data
    } catch (error) {
        console.log(message.error('Tạo mới thất bại'));
    }
}

// export const deleteShip = async (id: string) => {
//     try {
//         const res = await instance.delete(`/ships/delete/${id}`)
//         return res.data
//     } catch (error) {
//         console.log(message.error('Không tìm thấy ID '))
//     }
// }


// services/ship.ts

// Cập nhật phí khối lượng
export const updateWeightRate = async (shipId: string, updatedRate: IWeightRate) => {
    try {
        const response = await instance.put(`/ships/${shipId}/weights/${updatedRate._id}`, updatedRate);
        return response;  // Giả sử phản hồi trả về { success: true }
    } catch (error) {
        console.error('Error updating weight rate:', error);
        throw error;
    }
};

// Cập nhật phí thể tích
export const updateVolumeRate = async (shipId: string, updatedRate: IVolumeRate) => {
    try {
        const response = await instance.put(`/ships/${shipId}/volumes/${updatedRate._id}`, updatedRate);
        return response;  // Giả sử phản hồi trả về { success: true }
    } catch (error) {
        console.error('Error updating volume rate:', error);
        throw error;
    }
};






// Xóa weight
export const deleteWeight = async (shipId: string, weightId: string) => {
    try {
        const response = await instance.delete(`/ships/weight/${weightId}`, {
            data: { shipId },
        });
        return response.data;
    } catch (error) {
        console.error('Xóa weight thất bại', error);
        throw new Error('Xóa weight thất bại');
    }
};

// Xóa volume
export const deleteVolume = async (shipId: string, volumeId: string) => {
    try {
        const response = await instance.delete(`/ships/volume/${volumeId}`, {
            data: { shipId },
        });
        return response.data;
    } catch (error) {
        console.error('Xóa volume thất bại', error);
        throw new Error('Xóa volume thất bại');
    }
};


export const removeBranch = async (id: string) => {
    try {
        const res = await instance.delete(`ships/${id}`)
        return res
    } catch (error) {
        console.log("Xóa phương thức vận chuyển thất bại", message.error)
    }
}