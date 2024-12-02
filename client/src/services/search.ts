import instance from "../common/config/axios";
export const getSearchPopularProduct = async () => {
    try {
      const { data } = await instance.get("/searchs");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
};
export const trackSearch = async({ keyword }: {keyword: string })=>{
  try {
      const { data } = await instance.post("/searchs/add", {
          keyword   // Gửi từ khóa tìm kiếm dưới dạng query parameter
      });
      return data;  // Trả về kết quả tìm kiếm
  } catch (error) {
      console.log(error);
      throw error;
  }
}
