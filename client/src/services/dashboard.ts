import instance from "../common/config/axios"

export const getRevenue = async() =>{
    try {
        const data = await instance.get('')
    } catch (error) {
      return error
    }
}