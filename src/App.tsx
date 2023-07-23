import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main/Main';
import Daily from './Daily/Daily';
import Infinite from './Infinite/Infinite';
import Success from './Success/Success';
import Home from './Home/Home';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Main component={<Home/>}/>}/>
        <Route path='dailyChallenge' element={<Main component={<Daily />}/>}/>
        <Route path="infiniteChallenge" element={<Main component={<Infinite/>}/>}/>
        <Route path='success' element={<Success/>}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
