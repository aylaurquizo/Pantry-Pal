
import {FaHome, FaUser, FaBookmark} from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <NavLink to={'/'}>
        <FaHome className="sidebarsvg"/>
      </NavLink>
      <NavLink to={'/profile'}>
        <FaUser className="sidebarsvg"/>
      </NavLink>
      <NavLink to={'/favorites'}>
        <FaBookmark className="sidebarsvg"/>
      </NavLink>
    </div>
  )
}


export default Sidebar
