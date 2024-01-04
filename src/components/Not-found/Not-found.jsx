import React from 'react';
import psyduck from '../../img/psyduck.png';
import './Not-found.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <img className="not-found__image" src={psyduck} alt="psyduck" />
      <p className="not-found__text"> &rdquo;OH, OH, OH NOTHING FOUND&rdquo;</p>
    </div>
  );
}
