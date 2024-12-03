// services/contact.ts
import instance from "../common/config/axios";
import { IContact, IContactUpdate } from "../common/interfaces/contact";

// Tạo mới liên hệ
export const createContact = async (contactData: IContact) => {
    const response = await instance.post('/contacts', contactData);
    return response.data;
};

// Lấy danh sách liên hệ
export const fetchContacts = async () => {
    const response = await instance.get('/contacts');
    return response.data;
};

// Lấy chi tiết liên hệ theo ID
export const fetchContactById = async (contactId: string) => {
    const response = await instance.get(`/contacts/${contactId}`);
    return response.data;
};

// Cập nhật trạng thái và trả lời liên hệ
export const updateContactStatus = async ({ contactId, status, response }: IContactUpdate) => {
    const data = await instance.put(`/contacts/${contactId}`, {
        contactId,
        status,
        response
    });
    return data.data;
};

// Xóa liên hệ theo ID
export const deleteContact = async (contactId: string) => {
    const response = await instance.delete(`/contacts/${contactId}`);
    return response.data;
};