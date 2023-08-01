import React, {useState} from "react";

// This context is getting the user data from the backend and passing it to the components to be used in the components 
// This is also stored in the cookies so that the user can be logged in and logged out without having to log in again.
// Creating a user context object to share data between components
export const PageTypeContext = React.createContext();

// PageTypeContext function to provide user data to components
export const PageTypeHolder = (props) => {

    const [pageType, setPageType] = useState('')

    return (
        // Providing the current user and handleUser function to the context object
        <PageTypeContext.Provider value={{pageType, setPageType}}>
            {props.children}
        </PageTypeContext.Provider>
    );
}