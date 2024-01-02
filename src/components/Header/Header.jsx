import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/Pokédex_logo.png';

import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={Logo} alt="Logo" />
      </Link>

    </header>
  );
}
