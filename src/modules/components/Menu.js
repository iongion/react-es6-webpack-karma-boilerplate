// node
// vendors
import React from 'react';
// project
// locals

import MenuCSS from './Menu.css';

const Menu = () => (
  <ul className={MenuCSS.mainMenu}>
    <li><a href="#">File</a></li>
    <li><a href="#">Edit</a></li>
    <li><a href="#">Tools</a></li>
    <li><a href="#">Help</a></li>
  </ul>
);

export default Menu;
