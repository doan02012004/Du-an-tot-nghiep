import instance from "../common/config/axios";
export const trackSearch = async({ userId, keyword }: { userId: string; keyword: string })=>{
    try {
        const { data } = await instance.post("/trackSearchs/add", {
            userId,  // Gửi userId cùng với từ khóa tìm kiếm
            keyword   // Gửi từ khóa tìm kiếm dưới dạng query parameter
        });
        return data;  // Trả về kết quả tìm kiếm
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// export const getSearchHistoryByUser = async (userId:string)=>{
//     try {
//         const { data } = await instance.get(`/trackSearchs/${userId}`); // Truyền userId
//         return data;
//       } catch (error) {
//         console.log(error);
//         throw error;
//       }
// }