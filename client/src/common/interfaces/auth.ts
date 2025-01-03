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
export interface Iuser {
    _id?:number|string,
    firstname?:string,
    lastname?:string,
    email:string,
    password:string,
    phone?:number,
    date?:Date,
    gender?:string,
    city?:string,
    district?:string,
    ward?:string,
    address?:string
    status:boolean
    role?:string
    createdAt?:Date,
    updateAt?:Date
}
export interface IForgotPassword {
    email: string;
  }
  
  export interface IResetPassword {
    token: string; // Token để xác thực từ email
    password: string;
    confirmPassword: string;
  }
