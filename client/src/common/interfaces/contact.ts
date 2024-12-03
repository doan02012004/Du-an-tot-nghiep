export interface IContact {
    _id: string;
    userId: string;
    title: string;
    message: string;
    status: 'new' | 'in_progress' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}

export interface IContactUpdate {
    contactId: string;
    status: 'new' | 'in_progress' | 'resolved';
    response?: string;
}