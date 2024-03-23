import { SignedIn, SignedOut, } from "@clerk/clerk-react";
import { AiFillClockCircle, AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { ImCalendar } from 'react-icons/im';
import { IoIosCreate } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import SignIn from './ui/SignIn';
import SignOut from './ui/SignOut';

let activeStyle = {
  backgroundColor: "rgb(35, 39, 42)",
};

function Nav () {
  return (
    <nav className='Nav'>

      <SignedIn>
        <ul className='nav-list'>
          <li className={`nav-row`}>
            <NavLink
              to="/"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <AiFillHome />
              <p> Home </p>
            </NavLink>
          </li>

          <li className={`nav-row`}>
            <NavLink
              to="/employees"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <BsFillPeopleFill />
              <p>Employees</p>
            </NavLink>
          </li>

          <li
            className={`nav-row`}
          >
            <NavLink
              to="/shift-types"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <AiFillClockCircle />
              <p>Shift Types</p>
            </NavLink>
          </li>

          <li
            className={`nav-row`}
          >
            <NavLink
              to="/shifts"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <IoIosCreate />
              <p>Shifts</p>
            </NavLink>
          </li>

          <li
            className={`nav-row`}
          >
            <NavLink
              to="/rota"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <ImCalendar />
              <p>Rota</p>
            </NavLink>
          </li>
        </ul>
        <SignOut />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>

    </nav>
  );
};

export default Nav;;