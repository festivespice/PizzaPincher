import { Pizza } from "./Pizza"

export interface Place {
    id: number,
    title: string, 
    location: string,
    price: number|null,
    distance: number, 
    rating: number|null, 
    websiteURL: string|null,
    phoneNumber: string|null, 
    imageURL: string|null,
    ownerUsername: string|null
    pizzas: Pizza[] | null
  }