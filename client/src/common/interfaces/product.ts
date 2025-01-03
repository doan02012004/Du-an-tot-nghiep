import { ICategories } from "./categories"
import { IColor } from "./Color"



export interface Iproduct {
    _id?: string | number,
    name: string,
    slug:string,
    categoryId:ICategories,
    description: string,
    price_new: number,
    price_old: number,
    discount: number,
    sizes: string[],
    colors:IColor[]
    active: boolean,
    featured: boolean,
    gallerys: Igallery[],
    attributes: Iattribute[]
}
export interface IproductInfor {
    _id?: string | number,
    name: string,
    description: string,
    price_new: number,
    price_old: number,
    discount: number,
    status?: boolean,
    featured?: boolean,
    slug?:string
}

export interface Igallery {
    _id?: string | number,
    name: string,
    background?:string,
    avatar: string,
    items: string[],
    check?: boolean
}
export interface Iattribute {
    _id?: string | number,
    size: string,
    color: string,
    weight:number,
    price_new:number,
    price_old:number,
    discount:number,
    instock: number,
    isCheck:boolean,
    volume:number,
    length:number,
    width:number,
    height:number,
    active:boolean
}

export interface InewSize {
    size:string[],
    attributes:Iattribute[]
}
export interface InewColor {
    colors:IColor[],
    gallerys:Igallery[]
    attributes:Iattribute[]
}