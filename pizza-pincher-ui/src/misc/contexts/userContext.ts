import React, { Dispatch, SetStateAction } from "react";

//create an object that has a username and set username
const userContext = React.createContext<{
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
}>({
    username: '', //string
    setUsername: () => {}, //function with string input
})

export {userContext}

// Pass this value into a userContext.Provider Component that surrounds the root.
//specify the value being provided: 'value={this.state.user}'

//This value can be used by components nested in a userContext.Consumer component
//The 'value' specified in the provider can be referenced anywhere within the Consumer. 