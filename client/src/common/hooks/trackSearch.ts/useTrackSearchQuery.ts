import { useQuery } from "@tanstack/react-query"
// import { getSearchHistoryByUser } from "../../../services/trackSearch"
// const useTrackSearchQuery = (userId:string) => {
//     const query = useQuery({
//         queryKey:['TRACKSEARCH'],
//         queryFn: async() =>{
//             try {
//                 const data = await getSearchHistoryByUser(userId)
//                 return data
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     })
//   return query
// }
// export default useTrackSearchQuery