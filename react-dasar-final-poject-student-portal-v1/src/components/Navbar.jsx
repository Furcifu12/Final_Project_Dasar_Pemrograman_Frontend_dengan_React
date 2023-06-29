import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <h1>
        <NavLink to="/" data-testid="home-page">
          Student Portal
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink to="/student" data-testid="student-page">
            All Student
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" data-testid="add-page">
            Add Student
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
