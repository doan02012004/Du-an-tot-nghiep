export interface IWeightRate {
    minWeightValue?: number,
    maxWeightValue?: number,
    price?: number
}
export interface IVolumeRate {
    minVolumeValue?: number,
    maxVolumeValue?: number,
    price?: number
}

export interface IShip {
    id?: string,
    nameBranch?: string,
    weightRates?: IWeightRate[],
    volumeRates?: IVolumeRate[]
}