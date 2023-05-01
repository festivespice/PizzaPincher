import { Pizza } from "./Pizza"

export interface Place {
    id: number,
    name: string, 
    address: string,
    price: number|null,
    distance: number, 
    rating: number|null, 
    ratingNumber: number | null,
    website: string|null,
    number: string|null, 
    imageURL: string|null,
    ownerUsername: string|null
    pizzas: Pizza[] | null,
    openHours: string[] | null
  }