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
    },
    whoseTurn: 'player1'
  }

  generateRandomBoardData = () => {
    const newBoardData = ['start'];
    for (let i = 0; i < 23; i++) {
      let randomNum = Math.random();
      if (randomNum < 0.6) {
        newBoardData.push('earn');
      } else if (randomNum < 0.8) {
        newBoardData.push('lose');
      } else if (randomNum < 0.95) {
        newBoardData.push('powerup');
      } else {
        newBoardData.push('skull');
      }
    }
    this.setState({
      boardData: newBoardData
    })
  }

  componentDidMount() {
    this.generateRandomBoardData();
  }

  rollDice = () => {
    let roll = Math.floor(Math.random() * 6) + 1;
    console.log('you rolled a ' + roll);
  }

  render() {
    return (
      <div className="board-game">
        <div>
          <h2 className="score" style={{backgroundColor: 'lightyellow'}}>Player 1: ${this.state.player1data.money}</h2>
          <h2 className="score" style={{backgroundColor: 'lightgreen'}}>Player 2: ${this.state.player2data.money}</h2>
          <Board boardData={this.state.boardData} player1data={this.state.player1data} player2data={this.state.player2data} />
        </div>
        <button onClick={this.rollDice}>Roll dice</button>
      </div>
    )
  }
}

export default Boardgame
