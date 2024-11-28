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
