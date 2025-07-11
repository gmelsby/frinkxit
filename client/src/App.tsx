import React, { lazy, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useSessionStorage from './hooks/useSessionStorage';
import HomePage from './pages/HomePage';
import { DonutScene } from './components/Donut';
const RoomPage = lazy(() => import('./pages/RoomPage'));
const FourOhFour = lazy(() => import('./pages/FourOhFour'));



function App() {

  const [userId, setUserId] = useSessionStorage('userId', '');

  const generateUuid = useCallback(() => {
    setUserId(v4());
  }, [setUserId]);

  useEffect(() => {
    if (userId === '') {
      generateUuid();
    }
  }, [userId, generateUuid]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage userId={userId} />} />
        <Route path="/room">
          <Route path=":roomId" element={
            <React.Suspense fallback={<DonutScene />}>
              <RoomPage userId={userId} />
            </React.Suspense>} />
          <Route path="/room" element={<FourOhFour />} />
        </Route>
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
