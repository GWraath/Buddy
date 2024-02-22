import React from 'react'
import AppRoutes from '../routes/AppRoutes';

export const DebtContext = React.createContext();
export const UsersContext = React.createContext();
export const CurrentUserContext = React.createContext();
export const PageTypeContext = React.createContext();
export const VariableContext = React.createContext();
export const SearchContext = React.createContext();

export default function AppContext() {
    const [debts, setDebts] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [pageType, setPageType] = useState('')
    const [query, setQuery] = useState('')
    const [variable, setVariable] = useState({})
  
    return (
      <DebtContext.Provider value={{ debts, setDebts }}>
        <UsersContext.Provider value={{ users, setUsers }}>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <PageTypeContext.Provider value={{ pageType, setPageType }}>
              <VariableContext.Provider value={{ variable, setVariable }}>
                <SearchContext.Provider value={{ query, setQuery }}>
                    <Navbar/>
                    <AppRoutes/>
                </SearchContext.Provider>
            </VariableContext.Provider>
          </PageTypeContext.Provider>
        </CurrentUserContext.Provider>
      </UsersContext.Provider>
    </DebtContext.Provider>
  )
}
