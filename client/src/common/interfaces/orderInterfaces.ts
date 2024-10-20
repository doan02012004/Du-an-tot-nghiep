export interface IOrderItem {
    productId: string;
    name: string;
    categoryId: string;
    gallery: {
        avatar: string;
        name: string;
        items: string[];
    };
    price: number;
    attribute: {
        size: string;
        color: string;
    };
    quantity: number;
    total: number;
}

export interface IOrder {
    _id: string;
    userId: string;
    customerInfor: {
        fullname: string;
        phone: string;
        city: string;
        district: string;
        ward: string;
        address: string;
        option: 'house' | 'company';
    };
    items: IOrderItem[];
    orderNumber: string;
    paymentMethod: 'cash' | 'momo' | 'atm' | 'credit';
    status: 'pending' | 'unpaid' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'received';
    totalPrice: number;
    totalOrder: number;
    createdAt: Date;
}

export interface IshipItem {
    minWeight: number;
    maxWeight: number;
    price: number;
}

