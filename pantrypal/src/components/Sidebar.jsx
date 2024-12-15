import {FaHome, FaUser, FaBookmark} from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <List>
      <NavLink to={'/'}>
        <FaHome/>
      </NavLink>
      <NavLink to={'/profile'}>
        <FaUser/>
      </NavLink>
      <NavLink to={'/favorites'}>
        <FaBookmark/>
      </NavLink>
    </List>
  )
}

const List = styled.div`
    display: column;
    justify-content: center;
    margin: 2rem 0rem;
`;

export default Sidebar
