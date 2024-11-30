import { useQuery } from "@tanstack/react-query"
import { getAllShip, getShipById } from "../../../services/ship"


const useShipQuery = (option: { shipId?: string | number }) => {

    const query = useQuery({
        queryKey: ['SHIPS', option],
        queryFn: async () => {
            try {
                const data = option?.shipId ? await getShipById(option?.shipId) : await getAllShip()
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
    return query
}

export default useShipQuery