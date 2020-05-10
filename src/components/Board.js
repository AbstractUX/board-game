import React from 'react';
import './Board.css';



const Board = () => {
  return (
    <div className="board">
      {renderSpaces()}
    </div>
  )
}

const renderSpaces = () => {
  const spaces = [];
  for (let i = 0; i < 24; i++) {
    if (i < 7) {
      spaces.push(<div className="space" style={{left: i * 70}}>s</div>);
    } else if (i < 13) {
      spaces.push(<div className="space" style={{left: 420, top: (i * 70)-420}}>s</div>);
    } else if (i < 19) {
      spaces.push(<div className="space" style={{top: 420, right: (i * 70)-840}}>s</div>);
    } else {
      spaces.push(<div className="space" style={{right: 420, bottom: (i * 70)-1260}}>s</div>)
    }

  }
  return spaces;
}

export default Board;
