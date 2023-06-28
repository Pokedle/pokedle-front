import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main/Main';
import Daily from './Daily/Daily';
import Infinite from './Infinite/Infinite';
import Success from './Success/Success';
import Home from './Home/Home';
import Challenges from './Challenges/Challenges';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Main component={<Home/>}/>}/>
        <Route path='DailyChallenge' element={<Main component={<Daily />}/>}/>
        <Route path="InfiniteChallenge" element={<Main component={<Infinite/>}/>}/>
        <Route path='success' element={<Success/>}/>
        <Route path='challenges' element={<Main component={<Challenges/>}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
