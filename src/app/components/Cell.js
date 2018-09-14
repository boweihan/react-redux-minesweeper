import React, { Component } from 'react';
import {
  CELL_STATE_FLAGGED,
  CELL_STATE_HIT_MINE,
  CELL_STATE_REVEAL_MINE_FOUND,
  CELL_STATE_REVEAL_MINE_UNFOUND,
  CELL_STATE_REVEAL_MINE_WRONG,
  CELL_STATE_UNCLEARED,
} from '../constants';
import { isCellCleared } from '../utils/isCellCleared';
import { mapCellStateToProximityCount } from '../utils/mapCellStateToProximityCount';

class Cell extends Component {
  render() {
    return (
      <div className={this.getClassNames()} data-cell={this.props.cellId}>
        {this.getContent()}
      </div>
    );
  }

  getContent() {
    if (isCellCleared(this.props.code)) {
      const count = mapCellStateToProximityCount(this.props.code);
      return count > 0 ? count : '';
    }

    switch (this.props.code) {
      case CELL_STATE_HIT_MINE:
      case CELL_STATE_REVEAL_MINE_FOUND:
      case CELL_STATE_REVEAL_MINE_UNFOUND:
        return <span className="mine">&#10039;</span>;
      case CELL_STATE_REVEAL_MINE_WRONG:
        return <i className="zmdi zmdi-close" />;
      case CELL_STATE_UNCLEARED:
      case CELL_STATE_FLAGGED:
      default:
        return '';
    }
  }

  getClassNames() {
    const classNames = ['cell'];

    if (this.props.isFocused) {
      classNames.push('cell-focused');
    }

    if (isCellCleared(this.props.code)) {
      const count = mapCellStateToProximityCount(this.props.code);
      classNames.push('cell-state-cleared', `cell-state-${count}`);
    } else {
      switch (this.props.code) {
        case CELL_STATE_HIT_MINE:
          classNames.push('cell-state-hit-mine');
          break;
        case CELL_STATE_UNCLEARED:
          classNames.push('cell-state-uncleared');
          break;
        case CELL_STATE_FLAGGED:
          classNames.push('cell-state-flagged');
          break;
        case CELL_STATE_REVEAL_MINE_FOUND:
          classNames.push('cell-state-reveal-mine-found');
          break;
        case CELL_STATE_REVEAL_MINE_UNFOUND:
          classNames.push('cell-state-reveal-mine-unfound');
          break;
        case CELL_STATE_REVEAL_MINE_WRONG:
          classNames.push('cell-state-reveal-mine-wrong');
          break;
        default:
          break;
      }
    }

    return classNames.join(' ');
  }
}

export default Cell;
