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
      const data = await instance.get(`/dashboard/order`,{params:{start:option.startDate,end:option.endDate,status:option.status}})
      return data.data
  } catch (error) {
    return error
  }
}
export const getUserNewCount = async(option:{startDate?:string|null,endDate?:string|null}) =>{
  try {
      const data = await instance.get(`/dashboard/user/count`,{params:{start:option.startDate,end:option.endDate}})
      return data.data
  } catch (error) {
    return error
  }
}

export const getTopUserCount = async(option:{startDate?:string|null,endDate?:string|null}) =>{
  try {
      const data = await instance.get(`/dashboard/user/top`,{params:{start:option.startDate,end:option.endDate}})
      return data.data
  } catch (error) {
    return error
  }
}
export const getTopSellingProduct = async(option:{startDate?:string|null,endDate?:string|null}) =>{
  try {
      const data = await instance.get(`/dashboard/product/top`,{params:{start:option.startDate,end:option.endDate}})
      return data.data
  } catch (error) {
    return error
  }
}
export const getTopUserCity = async(option:{startDate?:string|null,endDate?:string|null}) =>{
  try {
      const data = await instance.get(`/dashboard/user/city`,{params:{start:option.startDate,end:option.endDate}})
      return data.data
  } catch (error) {
    return error
  }
}
export const getMonthlyRevenue = async() =>{
  try {
      const data = await instance.get(`/dashboard/order/month`)
      return data.data
  } catch (error) {
    return error
  }
}