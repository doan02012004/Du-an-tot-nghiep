import { useQuery } from '@tanstack/react-query';
import { fetchContactById, fetchContacts } from '../../../services/contact';

const useContactQuery = (contactId?: string) => {
    const query = useQuery({
        queryKey: ["CONTACT", contactId],
        queryFn: async () => {
            try {
                const data = contactId ? await fetchContactById(contactId) : await fetchContacts();
                return data;
            } catch (error) {
                console.log(error);
            }
        },
    });

    return query.data;
};

export default useContactQuery;
