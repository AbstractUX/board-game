import React from 'react';
import './Board.css';

const Board = (props) => {
  return (
    <div className="board">
      {renderSpaces()}
      {renderPlayerDisplay("player1", props.player1data.space)}
      {renderPlayerDisplay("player2", props.player2data.space)}
    </div>
  )
}

const renderSpaces = () => {
  const spaces = [];
  for (let i = 0; i < 24; i++) {
    if (i < 7) {
      spaces.push(<div className="space" style={{left: i * 70}}></div>);
    } else if (i < 13) {
      spaces.push(<div className="space" style={{left: 420, top: (i * 70)-420}}></div>);
    } else if (i < 19) {
      spaces.push(<div className="space" style={{top: 420, right: (i * 70)-840}}></div>);
    } else {
      spaces.push(<div className="space" style={{right: 420, bottom: (i * 70)-1260}}></div>);
    }
  }
  return spaces;
}

const renderPlayerDisplay = (player, playerSpace) => {
  if (playerSpace < 7) {
    return <div className={`${player} player`} style={{left: playerSpace * 70}}>P</div>;
  } else if (playerSpace < 13) {
    return <div className={`${player} player`} style={{left: 420, top: (playerSpace * 70)-420}}>P</div>;
  } else if (playerSpace < 19) {
    return <div className={`${player} player`} style={{top: 420, right: (playerSpace * 70)-840}}>P</div>;
  } else {
    return <div className={`${player} player`} style={{right: 420, bottom: (playerSpace * 70)-1260}}>P</div>;
  }
}

export default Board;
