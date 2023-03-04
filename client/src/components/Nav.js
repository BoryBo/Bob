import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { ImCalendar } from 'react-icons/im';
import { IoIosCreate } from 'react-icons/io';
//import { IoCreateOutline } from 'react-icons/io';
// import { AiOutlineClockCircle } from 'react-icons/ai';


function Nav () {
  return (
    <nav className='Nav'>
      <ul className='nav-list'>
      
        <li className='nav-row'>
          <Link to="/">
            <AiFillHome />
            <p> Home </p>
          </Link>
        </li>

        <li className='nav-row'>
          <Link to="/employees">
            <BsFillPeopleFill />
            <p>Employees</p>
          </Link>
        </li>

        <li className='nav-row'>
          <Link to="/shifts">
            <AiFillClockCircle />
            <p>Shifts</p>
          </Link>
        </li>

        <li className='nav-row'>
          <Link to="/allocations">
            <IoIosCreate />
            <p>Allocations</p>
          </Link>
        </li>

        <li className='nav-row'>

          <Link to="/rota">
            <ImCalendar />
            <p>Rota</p>
          </Link>
        </li>



      </ul>
    </nav>
  );
};

export default Nav;