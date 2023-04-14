import React, { Dispatch, SetStateAction } from "react";

interface pizzaInfo {
    Size: string,
    Cheese: string,
    Sauce: string,
    Toppings: string[]
}

//Instead of passing pizza data between components using props, 
//just allow all of the components to share a group of pizza variables.
const pizzaConfigContext = React.createContext<{
    locationCt: string,
    setLocationCt: Dispatch<SetStateAction<string>>
    pizzaTypeCt: string,
    setPizzaTypeCt: Dispatch<SetStateAction<string>>,
    pizzaIngredientsCt: pizzaInfo,
    setPizzaIngredientsCt: Dispatch<SetStateAction<pizzaInfo>>,
}>({
    locationCt: '',
    setLocationCt: () => {},
    pizzaTypeCt: '',
    setPizzaTypeCt: () => {},
    pizzaIngredientsCt: {
        Size: '',
        Cheese: '',
        Sauce: '',
        Toppings: []
    },
    setPizzaIngredientsCt: () => {},
})

export { pizzaConfigContext };
export type { pizzaInfo };
