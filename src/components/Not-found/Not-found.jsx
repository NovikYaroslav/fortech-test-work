import React from 'react';
import { useLocation } from 'react-router-dom';
import psyduck from '../../img/psyduck.png';
import './Not-found.css';

export default function NotFound() {
  const currentLocation = useLocation();
  return (
    <div className="not-found">
      <img className="not-found__image" src={psyduck} alt="psyduck" />
      <p className="not-found__text"> &rdquo;OH, OH, OH NOTHING FOUND&rdquo;</p>
      {currentLocation.pathname.includes('pokemon')
        ? <p className="not-found__text"> &rdquo;PLEASE PROCEED BACK&rdquo;</p>
        : <p className="not-found__text"> &rdquo;TRY CHANGING YOU SEARCH PARAMENETERS&rdquo;</p>}

    </div>
  );
}
