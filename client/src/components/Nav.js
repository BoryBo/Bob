import React from 'react';
import { Link } from 'react-router-dom';


function Nav () {
  return (
    <nav className='Nav'>
      <ul>
        <li>
          <Link to="/"> Home </Link>
        </li>

        <li>
          <Link to="/employees"> Employees </Link>
        </li>

        <li>
          <Link to="/shifts"> Shifts </Link>
        </li>

        <li>
          <Link to="/allocations"> Allocations </Link>
        </li>

        <li>
          <Link to="/rota"> Rota </Link>
        </li>



      </ul>
    </nav>
  );
};

export default Nav;