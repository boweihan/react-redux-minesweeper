import React, { Component } from 'react';

class BoardHeader extends Component {
  render() {
    return (
      <div className="board-header">
        <div
          className={
            'board-header-item mines-remaining' +
            (this.props.isFinished && !this.props.lastGameLost
              ? ' success'
              : '')
          }
        >
          <span className="board-header-item-icon">&#10039;</span>
          <span className="board-header-item-value">
            {this.props.minesRemaining}
          </span>
        </div>
        <div className="board-header-item time-elapsed">
          <span className="board-header-item-icon">
            <i className="zmdi zmdi-timer" />
          </span>
          <span className="board-header-item-value">
            {this.getFormattedTime()}
          </span>
        </div>
      </div>
    );
  }

  getFormattedTime() {
    const elapsedTime = Math.round(this.props.elapsedTime / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    let seconds = '' + elapsedTime % 60;
    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
}

export default BoardHeader;
