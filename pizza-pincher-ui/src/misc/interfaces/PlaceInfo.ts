import { Pizza } from "./Pizza"

export interface PlaceInfo {
    id: number,
    name: string, 
    address: string,
    price: number|null,
    distance: number, 
    rating: number|null, 
    ratingnumber: number | null,
    website: string|null,
    number: string|null, 
    imageURL: string|null,
    ownerUsername: string|null
    pizzas: Pizza[] | null,
    openHours: string[] | null,
    lati: number | null,
    long: number | null
    photo: string | null
  }