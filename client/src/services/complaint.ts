// services/complaint.ts
import instance from "../common/config/axios";
import { IComplaint, IComplaintUpdate } from "../common/interfaces/complaint";

// Tạo mới khiếu nại
export const createComplaint = async (complaintData: IComplaint) => {
    const response = await instance.post('/complaint', complaintData);
    return response.data;
};

// Lấy danh sách khiếu nại
export const fetchComplaints = async () => {
    const response = await instance.get('/complaint');
    return response.data;
};

// Lấy chi tiết khiếu nại theo ID
export const fetchComplaintById = async (complaintId: string) => {
    const response = await instance.get(`/complaint/${complaintId}`);
    return response.data;
};


// Cập nhật trạng thái khiếu nại
export const updateComplaintStatus = async ({ complaintId, status, response, note }: IComplaintUpdate) => {
    const data = await instance.put(`/complaint/${complaintId}`, {
        complaintId,
        status,
        response,
        note
    });
    return data.data;
};