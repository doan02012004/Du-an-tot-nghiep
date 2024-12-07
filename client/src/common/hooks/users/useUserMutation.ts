import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iuser } from '../../interfaces/auth'
import { creatUser, deleteUser, forgotUser, resetPassword, updateUser, updateUserStatus, verifyResetToken } from '../../../services/auth'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'
import { message } from 'antd'

const useUserMutation = () => {
  const { socket } = useContext(AppContext)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['USER'],
    mutationFn: async (option: { action?: string, user: Iuser; payload?: any }) => {
      switch (option.action) {
        case "add":
          try {
            await creatUser(option.user)
          } catch (error) {
            console.log(error)
          }
          break;
        case "update":
          try {
            const data = await updateUser(option.user)
            return data
          } catch (error) {
            console.log(error)
          }
          break;
        case "checked":
          try {
            const data = await updateUserStatus(option.user)
            if (data?.success) {
              if (socket?.current) {
                socket.current?.emit('adminStatusUser', data.data)
              }
            }
            
          } catch (error) {
            console.log(error)
          }
          break;
        case "delete":
          try {
            const data = await deleteUser(option.user)
            if (data?.success) {
              message.success('Xoá thành công')
              if (socket?.current) {
                socket.current?.emit('adminDeleteUser', data.data)
              }
            }
          } catch (error) {
            console.log(error)
          }
          break;
        case "forgotPassword":
          try {
            await forgotUser(option.payload);
          } catch (error) {
            console.log(error);
          }
          break;
        case "verifyResetToken":
          try {
            await verifyResetToken(option.payload);
          } catch (error) {
            console.log(error);
          }
          break;
        case "resetPassword":
          try {
            await resetPassword(option.payload);
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USER']
      })
    }
  })
  return mutation
}

export default useUserMutation