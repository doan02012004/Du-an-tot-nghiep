import instance from "../common/config/axios"

export const getRevenue = async(option:{startDate?:string|null,endDate?:string|null}) =>{
    try {
        const data = await instance.get(`/dashboard/revenue`,{params:{start:option.startDate,end:option.endDate}})
        return data.data
    } catch (error) {
      return error
    }
}
export const getStatusOrderCount = async(option:{startDate?:string|null,endDate?:string|null,status:string}) =>{
  try {
      const data = await instance.get(`/dashboard/order?status=${option.status}&start=${option.startDate}&end=${option.endDate}`)
      return data.data
  } catch (error) {
    return error
  }
}
export const getUserNewCount = async(option:{startDate?:Date,endDate?:Date}) =>{
  try {
      const data = await instance.get(`/dashboard/user/count?start=${option.startDate}&end=${option.endDate}`)
      return data.data
  } catch (error) {
    return error
  }
}