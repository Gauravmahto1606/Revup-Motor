import React, { useState, useEffect } from 'react';
import TopReview from './TopReview';
import NavbarVideo from './NavBarVideo';
import PopularBrands from './PopularBrands';


function Home() {
 
  return (
    
    <div className="container-fluid  " style={{"margin":"0px","padding":"0px"}}>

      <NavbarVideo/>
      <div className="container mt-2 card bg-light shadow-lg" >

      <TopReview/>
      </div>
      <PopularBrands/>
    </div>
  );
}

export default Home;
