import React from 'react';
import Board from './Board';
import './Boardgame.css';

class Boardgame extends React.Component {
  state = {
    boardData: [],
    player1data: {
      space: 0,
      money: 100,
      powerups: []
    },
    player2data: {
      space: 0,
      money: 100,
      powerups: []
    },
    whoseTurn: 'Player 1',
    messageDisplay: null
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

  rollDice = (whoRolled) => {
    let roll = Math.floor(Math.random() * 6) + 1;
    let whoseTurn = this.state.whoseTurn;
    if (whoRolled === 'Player 1') {
      this.setState((prevState) => ({
        whoseTurn: 'Player 2',
        messageDisplay: `Player 1 rolled a ${roll}`,
        player1data: {...prevState.player1data, space: (roll + prevState.player1data.space) % 24},
        roll: roll
      }), () => {
        this.checkSpaceLanded(whoseTurn);
      });
    } else {
      this.setState((prevState) => ({
        whoseTurn: 'Player 1',
        messageDisplay: `Player 2 rolled a ${roll}`,
        player2data: {...prevState.player2data, space: (roll + prevState.player2data.space) % 24},
        roll: roll
      }), () => {
        this.checkSpaceLanded(whoseTurn);
      });
    }
  }

  getRandomPowerup(player) {
    let randomNum = Math.random();
    let powerupToGet = null;

    if (randomNum < 0.33) {
        powerupToGet = 'roll twice';
    } else if (randomNum < 0.66) {
        powerupToGet = 'steal money';
    } else {
        powerupToGet = 'immunity';
    }
    if (player === 'Player 1') {
      this.setState((prevState) => ({
        player1data: {...prevState.player1data, powerups: [...prevState.player1data.powerups, powerupToGet]}
      }));
    } else {
      this.setState((prevState) => ({
        player2data: {...prevState.player2data, powerups: [...prevState.player2data.powerups, powerupToGet]}
      }));
    }

  }

  checkSpaceLanded = (whichPlayer) => {
    if (whichPlayer === 'Player 1') {
      switch (this.state.boardData[this.state.player1data.space]) {
        case 'earn':
          this.setState((prevState) => ({
            player1data: {...prevState.player1data, money: prevState.player1data.money + 100},
            messageDisplay: prevState.messageDisplay + ' and lands on a blue coin space, earning $100.'
          }));
          break;
        case 'lose':
          this.setState((prevState) => ({
            player1data: {...prevState.player1data, money: prevState.player1data.money - 100},
            messageDisplay: prevState.messageDisplay + ' and lands on a red coin space, losing $100.'
          }));
          break;
        case 'powerup':
          this.getRandomPowerup(whichPlayer);
          this.setState((prevState) => ({
            player1data: {...prevState.player1data},
            messageDisplay: prevState.messageDisplay + ' and picks up a powerup.'
          }));
          break;
        case 'skull':
          this.setState((prevState) => ({
            player1data: {...prevState.player1data, money: Math.floor(prevState.player1data.money / 2)},
            messageDisplay: prevState.messageDisplay + ' and lands on a skull, losing half their money.'
          }));
          break;
      }
    } else {
      switch (this.state.boardData[this.state.player2data.space]) {
        case 'earn':
          this.setState((prevState) => ({
            player2data: {...prevState.player2data, money: prevState.player2data.money + 100},
            messageDisplay: prevState.messageDisplay + ' and lands on a blue coin space, earning $100.'
          }));
          break;
        case 'lose':
        this.setState((prevState) => ({
          player2data: {...prevState.player2data, money: prevState.player2data.money + 100},
          messageDisplay: prevState.messageDisplay + ' and lands on a red coin space, losing $100.'
        }));
          break;
        case 'powerup':
        this.getRandomPowerup(whichPlayer);
          this.setState((prevState) => ({
            player2data: {...prevState.player2data},
            messageDisplay: prevState.messageDisplay + ' and picks up a powerup.'
          }));
          break;
        case 'skull':
          this.setState((prevState) => ({
            player2data: {...prevState.player2data, money: Math.floor(prevState.player2data.money / 2)},
            messageDisplay: prevState.messageDisplay + ' and lands on a skull, losing half their money.'
          }));
          break;
      }
    }
  }

  renderPowerups(powerups) {
    return powerups.map((powerup) => {
      return <div className="power-up">{powerup}</div>;
    });
  }

  render() {
    return (
      <div className="board-game">
        <div>
          <h2 className="score" style={{backgroundColor: 'lightyellow'}}>Player 1: ${this.state.player1data.money}</h2>
          <h2 className="score" style={{backgroundColor: 'lightgreen'}}>Player 2: ${this.state.player2data.money}</h2>
          <div>Player 1's powerups: {this.renderPowerups(this.state.player1data.powerups)}</div>
          <div>Player 2's powerups: {this.renderPowerups(this.state.player2data.powerups)}</div>
          <Board boardData={this.state.boardData} player1data={this.state.player1data} player2data={this.state.player2data} roll={this.state.roll} />
        </div>
        <h1>{this.state.whoseTurn}'s turn to roll.</h1>
        <h2>{this.state.messageDisplay}</h2>
        <button onClick={() => this.rollDice(this.state.whoseTurn)}>{this.state.whoseTurn} Roll dice</button>
      </div>
    )
  }
}

export default Boardgame
