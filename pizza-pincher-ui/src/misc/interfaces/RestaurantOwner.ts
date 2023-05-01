import { Place } from "./Place";

export interface RestaurantOwner {
    id: number,
    username: string,
    ownedPlaces: Place[] | null
  }