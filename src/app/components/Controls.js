import React, { Component } from 'react';

class Controls extends Component {
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="control-row">
          <div className="control">
            <label htmlFor="control-rows">Rows</label>
            <input
              id="control-rows"
              type="number"
              step="1"
              min={this.props.minRows}
              max={this.props.maxRows}
              value={this.props.rows}
              onChange={evt => this.props.onRowsChange(+evt.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="control-columns">Columns</label>
            <input
              id="control-columns"
              type="number"
              step="1"
              min={this.props.minCols}
              max={this.props.maxCols}
              value={this.props.cols}
              onChange={evt => this.props.onColumnsChange(+evt.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="control-mines">Mines</label>
            <input
              id="control-mines"
              type="number"
              step="1"
              min={this.props.minMines}
              max={this.props.maxMines}
              value={this.props.mines}
              onChange={evt => this.props.onMinesChange(+evt.target.value)}
            />
          </div>
        </div>
        <div className="control-row">
          <div className="control">
            <button
              type="button"
              disabled={!this.props.isStarted || this.props.isFinished}
              onClick={() => this.props.onPauseGame()}
            >
              {this.props.isPaused ? 'Resume Game' : 'Pause Game'}
            </button>
          </div>

          <div className="control">
            <button type="submit" ref={btn => (this.submitBtn = btn)}>
              New Game
            </button>
          </div>

          <div className="control">
            <button type="button" onClick={this.props.onReplayGame}>
              Replay Game
            </button>
          </div>
        </div>
      </form>
    );
  }

  onSubmit = evt => {
    evt.preventDefault();
    this.submitBtn.blur();
    this.props.onNewGame();
  };
}

export default Controls;
