import React from 'react';
import './TidalButton.css';

interface TidalButtonProps {
  onPlay: () => void;
  onRedirect: () => void;
}

const TidalButton: React.FC<TidalButtonProps> = ({ onPlay, onRedirect }) => {
  const playing = true;
  
  return (
    <div className="tidal-button">
      <button className="leftButton" onClick={onPlay}>
        <div className='iconWrapper'>
          {playing ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 4c3.87 0 7 3.13 7 7v2h-2.92L21 17.92V11a9 9 0 0 0-9-9c-1.95 0-3.76.62-5.23 1.68l1.44 1.44A6.9 6.9 0 0 1 12 4M2.27 1.72 1 3l3.33 3.32A8.9 8.9 0 0 0 3 11v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-1.17.29-2.26.79-3.22L15 17v4h3c.3 0 .59-.06.86-.14L21 23l1.27-1.27z"></path></svg>
          :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9"></path></svg>
          }
        </div>
        <div className='trackInfo'>
          <div className='title'>And We Go Gentle</div>
          <div className='artist'>Hiatus Kaiyote</div>
        </div>
      </button>
      <div className="rightButton" onClick={onRedirect}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M4 4 0 8l4 4 4-4 4 4-4 4 4 4 4-4-4-4 4-4 4 4 4-4-4-4-4 4-4-4-4 4z"/>
        </svg>
      </div>
    </div>
  );
};

export default TidalButton;