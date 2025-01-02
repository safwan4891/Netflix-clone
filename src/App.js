import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router v6
import './App.css';
import { Originals, Action, Romantic, Horror, Comedy, Documentaries, ScienceFiction } from './urls';
import { Header } from './Components/Header/Header';
import { Banner } from './Components/Banner/Banner';
import { RowPost } from './Components/RowPost/RowPost';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the splash screen */}
          <Route path="/" element={<SplashScreen />} />
          
          {/* Main page with movies and content */}
          <Route path="/home" element={
            <>
              <Header />
              <Banner />
              <RowPost url={Originals} title="Netflix Originals" isTVShow={true} />
              <RowPost url={Action} title="Action" isSmall />
              <RowPost url={Romantic} title="Romantic" isSmall />
              <RowPost url={Horror} title="Horror" isSmall />
              <RowPost url={Comedy} title="Comedy" isSmall />
              <RowPost url={Documentaries} title="Documentaries" isSmall />
              <RowPost url={ScienceFiction} title="Science Fiction" isSmall />
            </>
          } />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
