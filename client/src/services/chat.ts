import instance from "../common/config/axios"

export const sendMessage = async (data: any) => {
    try {
        const response = await instance.post('chat/send', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
