/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentService } from '../../../services/comment'
import { message } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContextProvider';


const useCommentMutation = () => {
  const {socket} = useContext(AppContext)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['comments'],
    mutationFn: async (option: { action: 'add' | 'addExtra' | 'deleteMain' | 'deleteExtra'|'like'|'likeExtra', newComment: any }) => {
      switch (option.action) {
        case 'add':
          try {
            const data = await commentService.addComment(option.newComment);
            if (data) {
              if (data?.comment) {
                message.success('Đã gửi đánh giá')
                if(socket?.current){
                  socket.current?.emit('addComment',data.comment)
                }
              }
            } else {
              message.error('Gửi đánh giá thất bại')
            }
          } catch (error) {
            console.log(error)
          }
          break;
        case 'addExtra':
          try {
            const data = await commentService.addReComment(option.newComment)
            if (data && data.recomment) {
              message.success('Đã gửi phản hồi')
              if(socket?.current){
                socket.current?.emit('addReComment',{recomment:data.recomment,productId:data.productId,commentId:data.commentId})
              }
            } else {
              message.error('Gửi phản hồi thất bại')
            }
          } catch (error) {
            console.log(error)
          }
          break;
        case 'deleteMain':
          try {
            const data = await commentService.deleteComment(option.newComment.commentId)
            if (data && data.comment) {
              message.success('Đã xóa đánh giá')
            } else {
              message.error('Xóa đánh giá thất bại')
            }
          } catch (error) {
            console.log(error)
          }
          break;
        case 'deleteExtra':
          try {
            const data = await commentService.deleteCommentExtra(option.newComment)
            if (data && data.comment) {
              message.success('Đã xóa đánh giá')
            } else {
              message.error('Xóa đánh giá thất bại')
            }
          } catch (error) {
            console.log(error)
          }
          break;
          case 'like':
            try {
              await commentService.toggleLikeComment(option.newComment)
            } catch (error) {
              console.log(error)
            }
            break;
            case 'likeExtra':
              try {
                await commentService.toggleLikeCommentExtra(option.newComment)
              } catch (error) {
                console.log(error)
              }
              break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      queryClient.invalidateQueries({ queryKey: ['ORDERS'] })
    },
  })
  return mutation
}



export default useCommentMutation