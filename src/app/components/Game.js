import React, { Component } from 'react';
import { connect } from 'react-redux';
import HelpModalComponent from './HelpModal';
import Header from './Header';
import Controls from './Controls';
import Board from './Board';

import {
  cellClick,
  focusCell,
  keyPressed,
  newGame,
  pauseGame,
  replayGame,
  updateTimer,
} from '../actions/board';

import {
  closeHelpModal,
  openHelpModal,
  setColumns,
  setRows,
  setTotalMines,
} from '../actions/controls';

class Game extends Component {
  state = {
    timer: null,
  };

  render() {
    return (
      <div className="app">
        <Header onToggleHelp={this.toggleHelp} />
        <div
          className={
            'game' +
            (this.props.board.isPaused ? ' game-paused' : '') +
            (this.props.board.isFinished ? ' game-finished' : '')
          }
        >
          <Controls
            {...this.props.controls}
            isStarted={this.props.board.isStarted}
            isPaused={this.props.board.isPaused}
            isFinished={this.props.board.isFinished}
            onNewGame={this.props.newGame}
            onReplayGame={this.props.replayGame}
            onPauseGame={this.props.pauseGame}
            onRowsChange={this.props.setRows}
            onColumnsChange={this.props.setColumns}
            onMinesChange={this.props.setTotalMines}
          />
          <Board
            {...this.props.board}
            onCellClick={this.onCellClick}
            onCellMouseOver={this.onCellMouseOver}
          />
          {this.renderHelp()}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.newGame();
    document.body.onkeydown = evt =>
      this.props.keyPressed(evt.shiftKey, evt.keyCode);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.board.gameId !== this.props.board.gameId) {
      this.cancelTimer();
    } else if (nextProps.board.isFinished && !this.props.board.isFinished) {
      this.cancelTimer();
    } else if (nextProps.board.isStarted && !this.props.board.isStarted) {
      this.resumeTimer();
    } else if (nextProps.board.isPaused !== this.props.board.isPaused) {
      if (nextProps.board.isPaused) {
        this.cancelTimer();
      } else {
        this.resumeTimer();
      }
    }
  }

  renderHelp = () => {
    return (
      this.props.controls.isHelpModalOpen && (
        <HelpModalComponent onClose={this.props.closeHelpModal} />
      )
    );
  };

  toggleHelp = () => {
    if (this.props.controls.isHelpModalOpen) {
      this.props.closeHelpModal();
    } else {
      this.props.openHelpModal();
    }
  };

  onCellClick = (cellId, isLeftClick) => {
    if (!(this.props.board.isFinished || this.props.board.isPaused)) {
      this.props.cellClick(cellId, isLeftClick);
    }
  };

  onCellMouseOver = cellId => {
    if (!(this.props.board.isFinished || this.props.board.isPaused)) {
      this.props.focusCell(cellId);
    }
  };

  resumeTimer = () => {
    this.setState({
      timer: setInterval(() => {
        this.props.updateTimer();
      }, 1000),
    });
  };

  cancelTimer = () => {
    if (this.state.timer !== null) {
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
      });
    }
  };
}

const mapStateToProps = state => {
  return {
    board: { ...state.board },
    controls: { ...state.controls },
  };
};

export default connect(mapStateToProps, {
  updateTimer,
  cellClick,
  focusCell,
  keyPressed,
  newGame,
  replayGame,
  pauseGame,
  setRows,
  setColumns,
  setTotalMines,
  openHelpModal,
  closeHelpModal,
})(Game);
