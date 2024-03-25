import React from 'react';
import './home.css';


import { useUser } from "@clerk/clerk-react";
import { useContext, useEffect } from 'react';
import { getUser } from '../ApiService';
import { UserContext } from '../context/UserContext';

function Home () {
  const { setUserId } = useContext(UserContext);
  const { user } = useUser();

  useEffect(() => {
    getUser(user.id)
      .then(res => setUserId(res.id));
  }, [setUserId, user]);


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