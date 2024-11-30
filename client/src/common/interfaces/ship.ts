export interface IWeightRate {
    _id?:string|number,
    minWeight?: number,
    maxWeight?: number,
    price?: number,
    check?:boolean
}
export interface IVolumeRate {
    _id?:string|number,
    minVolume?: number,
    maxVolume?: number,
    price?: number,
    check?:boolean
}

export interface IShip {
    _id?: string,
    nameBrand: string,
    weight: IWeightRate[],
    volume: IVolumeRate[]
}