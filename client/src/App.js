import { SignedIn } from "@clerk/clerk-react";
import Nav from './components/Nav';
import Redirect from './components/Redirect';
import UserContextProvider from './context/UserContext';

function App () {

  return (
    <div className="App">
      <Nav />
      <SignedIn>
        <UserContextProvider>
          <Redirect />
        </UserContextProvider>
      </SignedIn>
    </div>
  );
}

export default App;