// hooks/useContactMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createContact, deleteContact, updateContactStatus } from "../../../services/contact";
import { IContact } from "../../interfaces/contact";
import { IContactUpdate } from './../../interfaces/contact';

const useContactMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["CONTACT"],
        mutationFn: async (options: { action: string; contactData: any,contactId: string }) => {
            switch (options.action) {
                case "add":
                    try {
                        const data = await createContact(options.contactData as IContact);
                        message.success("Liên hệ của bạn đã được gửi");
                        return data;
                    } catch (error) {
                        message.error("Liên hệ thất bại");
                    }
                    break;
                case "update":
                    try {
                        const data = await updateContactStatus(options.contactData as IContactUpdate);
                        message.success("Liên hệ của bạn đã được cập nhật");
                        return data;
                    } catch (error) {
                        message.error("Cập nhật thất bại");
                    }
                    break;
                case "delete":
                    try {
                        const data = await deleteContact(options.contactId);
                        message.success("Liên hệ đã được xóa");
                        return data;
                    } catch (error) {
                        message.error("Xóa liên hệ thất bại");
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["CONTACT"] });
        },
    });

    return mutation;
};

export default useContactMutation;