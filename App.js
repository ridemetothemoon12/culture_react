import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';


function App() {
  return (
    <> 
      <Nav />
        <Routes>
          <Route path='/culture_react' element={<Main />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
