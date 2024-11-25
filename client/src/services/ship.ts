import { IShip } from './../common/interfaces/ship';
import { message } from "antd"
import instance from "../common/config/axios";

export const getAllShipClient= async () => {
    try {
        const res = await instance.get(`/ships/client`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}
export const getAllShipAdmin= async () => {
    try {
        const res = await instance.get(`/ships/admin`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}
export const getShipById = async (id: string|number) => {
    try {
        const res = await instance.get(`/ships/${id}`)
        return res.data
    } catch (error) {
        console.log(message.error('Lấy dữ liệu thất bại'));
    }
}

export const createShip = async ( newShip:IShip ) => {
    try {
        const res = await instance.post(`/ships/add`,newShip)
        return res.data
    } catch (error) {
        console.log(message.error('Tạo mới thất bại'));
    }
}