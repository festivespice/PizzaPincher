export interface Place {
    id: number,
    title: string, 
    location: string,
    hasPizza: boolean,
    price: number|null,
    distance: number, 
    rating: number|null, 
    websiteURL: string|null,
    phoneNumber: string|null, 
    imageURL: string|null
  }