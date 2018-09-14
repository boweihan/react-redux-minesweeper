import React, { Component } from 'react';
import Cell from './Cell';
import { repeat } from '../utils/repeat';
import BoardHeader from './BoardHeader';

class Board extends Component {
  render() {
    return (
      <div
        className={
          'board ' +
          (this.props.isFinished
            ? this.props.lastGameLost ? 'board-lost' : 'board-won'
            : '')
        }
        onClick={this.boardClicked}
        onMouseOver={this.boardMouseOver}
        onContextMenu={this.boardClicked}
      >
        <BoardHeader
          minesRemaining={this.props.minesRemaining}
          isFinished={this.props.isFinished}
          isPaused={this.props.isPaused}
          lastGameLost={this.props.lastGameLost}
          elapsedTime={this.props.elapsedTime}
        />
        {this.renderGrid()}
      </div>
    );
  }

  renderGrid = () => {
    return repeat(null, this.props.numRows).map((_, i) => this.renderRow(i));
  };

  renderRow = row => {
    return (
      <div className="board-row" key={'row.' + row}>
        {this.renderCells(row)}
      </div>
    );
  };

  renderCells = row => {
    return repeat(null, this.props.numCols).map((_, i) => {
      const cellId = row * this.props.numCols + i;
      return (
        <Cell
          key={'cell.' + cellId}
          cellId={cellId}
          code={this.props.board[cellId]}
          isFocused={this.props.focusedCell === cellId}
        />
      );
    });
  };

  boardClicked = evt => {
    const { classList } = evt.target;
    if (
      classList.contains('cell') &&
      !classList.contains('cell-state-cleared')
    ) {
      const cellId = +evt.target.getAttribute('data-cell');
      const { button } = evt.nativeEvent;

      if (button === 0) {
        // button is 0 for left click
        this.props.onCellClick(cellId, true);
      } else if (button === 2) {
        // button is 2 for right click
        evt.preventDefault();
        this.props.onCellClick(cellId, false);
      }
    } else {
      evt.preventDefault();
    }
  };

  boardMouseOver = evt => {
    const { classList } = evt.target;
    if (classList.contains('cell')) {
      const cellId = +evt.target.getAttribute('data-cell');
      this.props.onCellMouseOver(cellId);
    }
  };
}

export default Board;
