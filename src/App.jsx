import './App.css';
import React from 'react';
import Navbar from './NavBar';
import AppRoutes from './routes/AppRoutes';
import { CurrentUserHolder } from './context/CurrentUserContext';
import { PageTypeHolder } from './context/PageTypeContext';
import { DebtContextHolder } from './context/DebtContext';
import { SearchHolder } from './context/SearchContext';
import { UserContextHolder } from './context/UserContext';
import { VariableHolder } from './context/VariableContext';

function App() {

  return (
    <>
      <CurrentUserHolder>
        <PageTypeHolder>
          <DebtContextHolder>
            <SearchHolder>
              <UserContextHolder>
                <VariableHolder>
                  <Navbar />
                  <AppRoutes />
                </VariableHolder>
              </UserContextHolder>
            </SearchHolder>
          </DebtContextHolder>
        </PageTypeHolder>
      </CurrentUserHolder>
    </>
  );
}

export default App;
