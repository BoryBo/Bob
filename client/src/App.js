import './App.css';
import Nav from './components/Nav';
import Redirect from './components/Redirect';
import React, { useState } from 'react';



function App () {
  const [selectedTab, setSelectedTab] = useState('Home');
  return (
    <div className="App">
      <Nav
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Redirect

      />
    </div>
  );
}

export default App;