import React from 'react';
import './TidalButton.css';

interface TidalButtonProps {
  onPlay: () => void;
  onRedirect: () => void;
}

const TidalButton: React.FC<TidalButtonProps> = ({ onPlay, onRedirect }) => {
  return (
    <div className="tidal-button">
      <div className="left" onClick={onPlay}>
        <span>▶</span>
        <div className="text">
          <strong>Block Vibes</strong>
          <div>Curated by JAY-Z</div>
        </div>
      </div>
      <div className="right" onClick={onRedirect}>
        <span className="logo">🎶</span>
      </div>
    </div>
  );
};

export default TidalButton;