import { Iproduct } from "./product";

export interface InewCart {
    productId?:string,
    attributeId?:string,
    quantity?:number,
    galleryId?:string,
}
export interface IcartItem {
    productId: Iproduct,
    attributeId?:string,
    quantity:number,
    galleryId?:string,
    total:number,
    validateCart: boolean
}

export interface ICart {
    userId?:string,
    carts:IcartItem[],
    totalCart:number,
    totalPrice:number
}