export interface Iaddress {
    userId:string,
    _id:string,
    fullname:string,
    city:string,
    ward:string,
    district:string,
    address:string,
    isDefault:boolean,
    phone:string,
    option:"house" | "company"
}