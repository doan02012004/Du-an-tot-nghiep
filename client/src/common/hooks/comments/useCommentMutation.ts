/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentService } from '../../../services/comment'
import { message } from 'antd';


const useCommentMutation = () => {
    const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey:['comments'],
    mutationFn: async (option: { action: string, newComment:any }) => {
        switch (option.action) {
          case 'add':
            try {
              const data = await commentService.addComment(option.newComment);
              if(data && data.comment){
                message.success('Đã gửi đánh giá')
              }else{
                message.error('Gửi đánh giá thất bại')
              }
            } catch (error) {
              console.log(error)
            }
            break;
        //   case 'update':
        //     try {
        //       await updateComment(option.comment)
        //     } catch (error) {
        //       console.log(error)
        //     }
        //     break;
          case 'deleteMain':
            try {
             const data = await commentService.deleteComment(option.newComment.commentId)
              if(data && data.comment){
                message.success('Đã xóa đánh giá')
              }else{
                message.error('Xóa đánh giá thất bại')
              }
            } catch (error) {
              console.log(error)
            }
            break;
        }
      },
      onSuccess :() => {
          queryClient.invalidateQueries({queryKey:['comments']})
      },
    })
    return mutation
}
 


export default useCommentMutation