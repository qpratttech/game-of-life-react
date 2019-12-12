import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#ffffff",
      opacity: 0.1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTurnChange = this.handleTurnChange.bind(this);
  }

  nextGeneration() {
    let opacity = this.state.opacity;
    opacity = opacity < 1 ? opacity + 0.1 : 1;
    this.setState({ opacity: opacity });
  }

  killCell() {
    this.setState({ color: "#ffffff" });
  }

  isAlive() {
    return this.state.color != "#ffffff";
  }

  reproduction(neighbors) {
    if (this.state.color == "#ffffff") {
      this.setState({ color: this.combineColors(neighbors) });
    }
  }

  combineColors(neighbors) {
    // colorParts is an array that contains 3 indexes: index 0 is R from the leftmost parent,
    // index 1 is the G value from the next parent, and index 2 is the B value from the third parent.
    let colorParts = this.getColorParts(neighbors);
    return "#"
      .concat(colorParts[0])
      .concat(colorParts[1])
      .concat(colorParts[2]);
  }

  getColorParts(neighbors) {
    let colorParts = [];
    let colors = this.getParentColors(neighbors);
    colorParts.push(colors[0].substr(1, 2));
    colorParts.push(colors[1].substr(3, 2));
    colorParts.push(colors[2].substr(5, 2));
    return colorParts;
  }

  getParentColors(neighbors) {
    let colors = [];
    if (this.liveNeighbors(neighbors) == 3) {
      for (let key in neighbors) {
        if (this.neighborIsAlive(neighbors[key])) {
          colors.push(neighbors[key].value);
        }
      }
    }
    return colors;
  }

  getNeighbors() {
    let y = this.props.y;
    let x = this.props.x;
    return {
      left: this.getNeighbor(y, x - 1),
      topLeft: this.getNeighbor(y - 1, x - 1),
      top: this.getNeighbor(y - 1, x),
      topRight: this.getNeighbor(y - 1, x + 1),
      right: this.getNeighbor(y, x + 1),
      bottomRight: this.getNeighbor(y + 1, x + 1),
      bottom: this.getNeighbor(y + 1, x),
      bottomLeft: this.getNeighbor(y + 1, x - 1)
    };
  }

  getNeighbor(y, x) {
    let neighbor = document.querySelector(`.y${y}.x${x}`);
    return neighbor ? neighbor : null;
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

  componentDidUpdate(prevProps) {
    if (this.props.turn !== prevProps.turn) {
      this.handleTurnChange();
    }
  }

  handleTurnChange() {
    let neighbors = this.getNeighbors();
    let liveNeighbors = this.liveNeighbors(neighbors);
    if (liveNeighbors < 2) {
      this.killCell(); //under-population
    } else if (liveNeighbors <= 3) {
      if (this.isAlive()) {
        this.nextGeneration();
      } else if (liveNeighbors == 3) {
        this.reproduction(neighbors);
      }
    } else {
      this.killCell(); //overcrowded
    }
  }

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
        style={{ opacity: this.state.opacity }}
        value={this.state.color}
        onChange={this.handleChange}
      />
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      interval: 500,
      turn: 0
    };

    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), this.state.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.start) {
      this.setState({ turn: this.state.turn + 1 });
    }
  }

  handleStart() {
    this.setState({ start: true });
  }

  handlePause() {
    this.setState({ start: false });
  }

  renderSquare(y, x, turn, clear) {
    return <Square y={y} x={x} turn={turn} clear={clear} />;
  }

  renderStartButton() {
    return (
      <button className="startButton" onClick={this.handleStart}>
        Start
      </button>
    );
  }

  renderPauseButton() {
    return (
      <button className="pauseButton" onClick={this.handlePause}>
        Pause
      </button>
    );
  }

  renderClearButton() {
    return (
      <button className="clearButton" onClick={this.handleClear}>
        Clear
      </button>
    );
  }

  render() {
    let rows = [];
    let turn = this.state.turn;
    rows.push(this.renderStartButton());
    rows.push(this.renderPauseButton());
    rows.push(this.renderClearButton());
    rows.push(<br />);
    rows.push(<br />);
    for (let y = 1; y <= 15; y++) {
      for (let x = 1; x <= 15; x++) {
        rows.push(this.renderSquare(y, x, turn));
      }
      rows.push(<br />);
    }
    return rows;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
