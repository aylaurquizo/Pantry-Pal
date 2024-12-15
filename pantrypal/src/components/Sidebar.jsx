
import {FaHome, FaUser, FaBookmark} from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <List className='sidebar'>
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
    display: flex;
    flex-direction: column;
    margin: 0rem 0rem;
    background-color: rgb(249, 244, 233);
    height: 40%;
    border-radius: 1rem;

    svg {
      height: 2rem;
      width: 2rem;
      margin: 1.5rem;
      color: rgba(109, 80, 53);;
    }
`;


export default Sidebar
