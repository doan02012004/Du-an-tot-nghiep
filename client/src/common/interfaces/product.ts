import { IColor } from "./Color"


export interface Iproduct {
    _id?:string|number,
    name:string,
    description:string,
    price_new:number,
    price_old: number,
    discount:number,
    active:boolean,
    featured:boolean,
    gallerys:Igallery[],
    attributes: Iattribute[]
}
export interface IproductInfor {
    _id?:string|number,
    name:string,
    description:string,
    price_new:number,
    price_old: number,
    discount:number,
    active?:boolean,
    featured?:boolean,
}

export interface Igallery{
    _id?:string|number,
    colorId:IColor,
    avatar: string,
    items: string[],
    check?:boolean
}
export interface Iattribute{
    _id?:string|number,
    size:string,
    color: string,
    instock: number
}