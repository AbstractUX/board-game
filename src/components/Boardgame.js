import React from 'react';
import Board from './Board';
import './Boardgame.css';

class Boardgame extends React.Component {
  state = {
    boardData: [],
    player1data: {
      space: 0,
      money: 0
    },
    player2data: {
      space: 0,
      money: 0
    }
  }

  generateRandomBoardData = () => {
    const newBoardData = [];
    for (let i = 0; i < 23; i++) {
      let randomNum = Math.random();
      if (randomNum < 0.5) {
        newBoardData.push('earn');
      } else if (randomNum < 0.7) {
        newBoardData.push('lose');
      } else if (randomNum < 0.8) {
        newBoardData.push('go again');
      } else if (randomNum < 0.9) {
        newBoardData.push('wild event');
      } else {
        newBoardData.push('empty');
      }
    }
    this.setState({
      boardData: newBoardData
    })
  }

  componentDidMount() {
    this.generateRandomBoardData();
  }

  render() {
    console.log(this.state);
    return (
      <div className="board-game">
        <div>
          <h2 className="score" style={{backgroundColor: 'lightyellow'}}>Player 1: ${this.state.player1data.money}</h2>
          <h2 className="score" style={{backgroundColor: 'lightgreen'}}>Player 2: ${this.state.player2data.money}</h2>
          <Board />
        </div>
        <button>Roll dice</button>
      </div>
    )
  }
}

export default Boardgame
