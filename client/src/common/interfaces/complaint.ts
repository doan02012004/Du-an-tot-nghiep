export interface IComplaint {
    _id: string;
    orderId: string;
    userId: string;
    complaintReason: string;
    status: 'new' | 'in_progress' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}

export interface IComplaintUpdate {
    complaintId: string;
    status: 'new' | 'in_progress' | 'resolved';
    response?: string;
}
