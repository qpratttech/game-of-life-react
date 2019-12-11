import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#ffffff"
    };

    this.handleChange = this.handleChange.bind(this);
  }
  /*
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  underPopulation()
  nextGeneration()
  overCrowded()

  isAlive() {
    return this.state.color != "#ffffff";
  }

  reprodution(neighbors) {
    if (this.color == '#ffffff' ) {
        this.setState({color: this.combineColors(neighbors)})
    }
  }

  combineColors(neighbors) {
    // colorParts is an array that contains 3 indexes: index 0 is R from the leftmost parent, 
    // index 1 is the G value from the next parent, and index 2 is the B value from the third parent.
    let colorParts = this.getColorParts(neighbors);
    return '#'.concat.colorParts[0].concat(colorParts[1]).concat(colorParts[2]);
  }

  getColorParts(neighbors) {
    let colorParts = [];
    let colors = this.getParentColors(neighbors);
    colorParts.push(colors[0].substr(1,2));
    colorParts.push(colors[1].substr(3,2));
    colorParts.push(colors[2].substr(5,2));
    return colorParts;
  }

  getParentColors(neighbors) {
    let colors = [];
    let dead = "#ffffff";
    if (this.liveNeighbors(neighbors) == 3) {
      for (let key in neighbors) {
        if (this.neighborIsAlive(neighbors[key])) {
          colors.push(neighbors[key].value);
        }
    }
    return colors;
  }

  getNeighbors() {
    let y = this.props.y;
    let x = this.props.x;
    return { left: this.getNeighbor(y, x-1),
      topLeft: this.getNeighbor(y-1, x-1),
      top: this.getNeighbor(y-1, x),
      topRight: this.getNeighbor(y-1, x+1),
      right: this.getNeighbor(y, x+1),
      bottomRight: this.getNeighbor(y+1, x+1),
      bottom: this.getNeighbor(y+1, x),
      bottomLeft: this.getNeighbor(y+1, x-1)
    }
  }

  getNeighbor(y,x) {
    let neighbor = document.querySelector(`.y${y}.x${x}`);
    return (neighbor ? neighbor : null);
  }

  liveNeighbors(neighbors) {
    let liveNeighbors = 0;
    for (let key in neighbors) {
      if (this.neighborIsAlive(neighbors[key])) {
        liveNeighbors++;
      }
    }
    return liveNeighbors;
  }

  neighborIsAlive(neighbor) {
    let dead = "#ffffff";
    return neighbor && neighbor.value != dead;
  }

  tick() {
    let neighbors = this.getNeighbors();
    let liveNeighbors = this.liveNeihbors(neighbors);
    if (liveNeighbors < 2) {
      this.underPopulation();
    } else if (liveNeighbors <= 3) {
      if (this.isAlive) {
        this.nextGeneration();
      } else if (liveNeighbors == 3) {
        this.reproduction(neighbors);
      }
    } else {
      this.overCrowded();
    }
  }
*/
  handleChange(event) {
    this.setState({ color: event.target.value });
  }

  render() {
    let className = "square "
      .concat("y".concat(this.props.y))
      .concat(" x".concat(this.props.x));
    return (
      <input
        className={className}
        type="color"
        value={this.state.color}
        onChange={this.handleChange}
      />
    );
  }
}

class Board extends React.Component {
  renderSquare(y, x) {
    return <Square y={y} x={x} />;
  }

  renderBoard() {
    let rows = [];
    for (let y = 1; y <= 15; y++) {
      for (let x = 1; x <= 15; x++) {
        rows.push(this.renderSquare(y, x));
      }
      rows.push(<br />);
    }
    return rows;
  }

  board = this.renderBoard();

  render() {
    return this.board;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
