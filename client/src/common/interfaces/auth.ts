export interface Isignup{
    id?:number|string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone:number,
    date:string
    gender:string,
    city:string,
    district:string,
    ward:string,
    address:string,
    role:string,
}
export interface Isignin{
    id?:number|string,
    email:string,
    password:string
}
