import CarsList from '../components/CarsList';
import React from 'react';

const Home = () => {
  return (
    <div className="ct__home container">
      <h1 className="text-center">Welcome To CarTrawler</h1>
      <CarsList />
    </div>
  );
};

export default Home;
