import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useRevenueQuery = (option:{startDate?:Date,endDate?:Date}) => {
    const query = useQuery({
        queryKey:['REVENUE',option],
        queryFn: () =>{
            try {
                const res = await
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useRevenueQuery