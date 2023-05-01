import { PlaceInfo } from "./PlaceInfo";

export interface RestaurantOwner {
    id: number,
    username: string,
    ownedPlaces: PlaceInfo[] | null
  }