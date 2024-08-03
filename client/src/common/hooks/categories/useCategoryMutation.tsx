import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Icategories } from '../../../interface/categories'
import { create } from '../../../services/categories'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

type Props = {}

const useCategoryMutation = (props: Props) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['CATEGORIES'],
        mutationFn:async(category:Icategories)=>{
            try {
                await create(category)
                message.success("Thêm thành công")
                navigate(`/admin/categories`)
            } catch (error) {
                message.error("Thêm thất bại")
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey:['CATEGORIES']})
        },
    })
  return mutation
}

export default useCategoryMutation