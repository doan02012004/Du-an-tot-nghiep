import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iuser } from '../../interfaces/auth'
import { creatUser, deleteUser, forgotUser, resetPassword, updateUser, updateUserStatus, verifyResetToken } from '../../../services/auth'

const useUserMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['USER'],
    mutationFn: async (option: { action: string, user: Iuser; payload: any }) => {
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
            await updateUserStatus(option.user)
          } catch (error) {
            console.log(error)
          }
          break;
        case "delete":
          try {
            await deleteUser(option.user)
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