import { useQuery } from '@tanstack/react-query';
import { fetchComplaintById, fetchComplaints } from '../../../services/complaint';

const useComplaintQuery = (complaintId?:string) =>{
    const query = useQuery({
        queryKey:["COMPLAINT",complaintId],
        queryFn:async()=>{
            try {
                const data = complaintId ? await fetchComplaintById(complaintId) : await fetchComplaints();
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
    return query.data
}
export default useComplaintQuery