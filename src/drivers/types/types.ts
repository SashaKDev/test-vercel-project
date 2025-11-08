export enum VehicleFeature {
    WiFi = 'wi-fi',
    ChildSeat = 'child-seat',
    PetFriendly = 'pet-friendly'
}

export type Driver = {
    id: number,
    name: string,
    phoneNumber: string,
    email: string,
    vehicleMake: string, //toyota
    vehicleModel: string, //camry
    vehicleYear: number,
    vehicleLicensePlate: string,
    vehicleDescription: string | null,
    vehicleFeatures: VehicleFeature[],
    createdAt: Date
};