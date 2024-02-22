import './App.css';
import './SeedFlower.css'
import React from 'react';
import Navbar from './NavBar';
import AppRoutes from './routes/AppRoutes';
import { CurrentUserHolder } from './context/CurrentUserContext';
import { PageTypeHolder } from './context/PageTypeContext';
import { DebtContextHolder } from './context/DebtContext';
import { SearchHolder } from './context/SearchContext';
import { UserContextHolder } from './context/UserContext';
import { VariableHolder } from './context/VariableContext';
import { FunctionHolder } from './context/FunctionContext';
import Footer from './Footer';

function App() {
  return (
      <CurrentUserHolder>
        <PageTypeHolder>
          <DebtContextHolder>
            <SearchHolder>
              <UserContextHolder>
                <VariableHolder>
                  <FunctionHolder>
                    <Navbar />
                    <AppRoutes />
                    <Footer/>
                  </FunctionHolder>
                </VariableHolder>
              </UserContextHolder>
            </SearchHolder>
          </DebtContextHolder>
        </PageTypeHolder>
      </CurrentUserHolder>
  );
}

export default App;
