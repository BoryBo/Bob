import React from 'react';
import './home.css';


import { useUser } from "@clerk/clerk-react";
import { useEffect } from 'react';
import { getUser } from '../ApiService';

function Home () {
  const { user } = useUser();
  useEffect(() => {
    getUser(user.id)
      .then(res => console.log(res));
  }, [user]);


  return (
    <>
      <div className='bgr'>
        <h1>Bob</h1>
        <p>A shift planner for busy medical professionals</p>
      </div>
    </>
  );
}

export default Home;;