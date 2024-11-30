import { useQuery } from "@tanstack/react-query";
import { commentService } from "../../../services/comment";

const useCommentQuery = (productId:string|number) => {

    const query = useQuery({
        queryKey: ['comments', productId],
        queryFn: async () => {
            try {
                const data = await commentService.getCommentsByProductId(productId)
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        enabled:!!productId, // Chỉ khi productId khác undefined thì query s�� mới lấy dữ liệu
    })
  return query
}

export default useCommentQuery