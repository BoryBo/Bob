import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { ImCalendar } from 'react-icons/im';
import { IoIosCreate } from 'react-icons/io';

let activeStyle = {
  backgroundColor: "rgb(35, 39, 42)",
};

function Nav () {
  return (
    <nav className='Nav'>

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
    </nav>
  );
};

export default Nav;;