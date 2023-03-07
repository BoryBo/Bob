import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { ImCalendar } from 'react-icons/im';
import { IoIosCreate } from 'react-icons/io';
//import { IoCreateOutline } from 'react-icons/io';
// import { AiOutlineClockCircle } from 'react-icons/ai';


function Nav ({ selectedTab, setSelectedTab }) {
  return (
    <nav className='Nav'>
      <ul className='nav-list'>

        <li
          className={`nav-row ${selectedTab === 'nav-home' ? 'nav-selected' : 'nav-not-selected'}`}
          onClick={setSelectedTab('nav-home')}
        >
          <Link to="/">
            <AiFillHome />
            <p> Home </p>
          </Link>
        </li>

        <li className={`nav-row ${selectedTab === 'nav-employees' ? 'nav-selected' : 'nav-not-selected'} `}>
          <Link
            to="/employees"
            onClick={setSelectedTab('nav-employees')}
          >
            <BsFillPeopleFill />
            <p>Employees</p>
          </Link>
        </li>

        <li
          className={`nav-row ${selectedTab === 'nav-shift-types' ? 'nav-selected' : 'nav-not-selected'} `}
          onClick={setSelectedTab('nav-shift-types')}
        >
          <Link to="/shift-types">
            <AiFillClockCircle />
            <p>Shift Types</p>
          </Link>
        </li>

        <li
          className={`nav-row ${selectedTab === 'nav-shifts' ? 'nav-selected' : 'nav-not-selected'}`}
          onClick={setSelectedTab('nav-shifts')}
        >
          <Link to="/shifts">
            <IoIosCreate />
            <p>Shifts</p>
          </Link>
        </li>

        <li
          className={`nav-row ${selectedTab === 'nav-rota' ? 'nav-selected' : 'nav-not-selected'} `}
          onClick={setSelectedTab('nav-rota')}
        >
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