import React, { useState} from 'react';
import { Button } from '../navButton/Button';
import { Link} from 'react-router-dom';
import './navbar.css';
import Dropdown from '../dropdown/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars, faTimes
} from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
 


  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Math Quiz
        </Link>
        <div className='menu-icon' onClick={handleClick}>
         {click?<FontAwesomeIcon icon={faTimes} className='fa-bars'/> : <FontAwesomeIcon icon={faBars} className='fa-bars'/> }  
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/menu'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Menu <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/arithmeticLevelOne'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Arithmetic 1
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/arithmeticLevelTwo'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Arithmetic 2
            </Link>
          </li>
          <li>
            <Link
              to='/login'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
         
       
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
