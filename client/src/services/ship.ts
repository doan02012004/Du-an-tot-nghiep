import { IShip } from './../common/interfaces/ship';
import { message } from "antd"
import instance from "../common/config/axios";

export const getShipFee = async () => {
    try {
        const res = await instance.get(`/ships`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}

export const getShipById = async (id: IShip) => {
    try {
        const res = await instance.get(`/ships/${id}`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}

// export const createShip = async (  ) => {
//     try {

//     } catch (error) {
//         console.log(message.error('Tạo mới thất bại'));
//     }
// }