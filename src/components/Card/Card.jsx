import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import question from '../../img/no-image.png';
import { typesColors } from '../../utils/const';
import './Card.css';

import { fetchSelectedPokemon } from '../../store/actions/asyncActions';

export default function Card({
  id, name, avatar = question, type, hp, attack, defense,
}) {
  const dispatch = useDispatch();

  function handleCardClick() {
    dispatch(fetchSelectedPokemon(name));
  }

  return (
    <Link to={`/pokemon/${name}`} onClick={() => handleCardClick()} style={{ textDecoration: 'none', color: 'currentcolor' }}>
      <li className="card">

        <div className="card_header">
          <h3 className="card_pokemon-name">{name}</h3>
          <b className="card_pokemon-id">
            #
            {id}
          </b>
        </div>
        <img
          className="card-pokemon-avatar"
          src={avatar === null ? question : avatar}
          alt="pokemon-avatar"
        />

        <div className="card_info">
          <div className="card_pokemon-info-block">
            <p className="card_info-heading">Type:</p>
            <div className="card_type-list">
              {type.map((el) => (
                <p
                  className="card_pokemon-type-tag"
                  style={{ backgroundColor: `${typesColors[el]}` }}
                  key={el}
                >
                  {el}
                </p>
              ))}
            </div>
          </div>

          <div className="card_pokemon-info-block">
            <p className="card_info-heading">Stats:</p>
            <ul className="card_stats-list">
              <li className="card_text">
                HP:
                {hp}
              </li>
              <li className="card_text">
                Attack:
                {attack}
              </li>
              <li className="card_text">
                Defense:
                {defense}
              </li>
            </ul>
          </div>
        </div>

      </li>
    </Link>
  );
}
