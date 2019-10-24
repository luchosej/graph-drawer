import React, { Component } from 'react';
import { Select, Input, Button } from 'semantic-ui-react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import EdgeIcon from 'assets/edge.svg';

import './styles.scss';

class PathFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: get(props, 'selected.id') || '',
      level: 0,
    }
  }

  handleOnFindPath() {
    const { onFindPath } = this.props;
    const { to, level } = this.state;
    onFindPath(to, level)
  }

  render() {
    const { nodeOptions, onClear } = this.props;
    const { to } = this.state;
    return (
      <div className="path-finder">
        <img className="path-finder__icon" src={EdgeIcon} alt="edge icon" />
        <div className="path-finder__title">
          Find path from Root
        </div>
        <div>
          <div className="path-finder__selector">
            <span>to</span>
            <Select
              className="path-finder__selector-select"
              compact
              options={nodeOptions}
              placeholder="to"
              value={to}
              onChange={(ev, data) => this.setState({
                to: data.value
              })}
            />
          </div>
            <div className="path-finder__selector">
            <span>with</span>
              <Input
                className="path-finder__selector-select"
                placeholder="levels (optional)"
                type="number"
                min={1}
                onChange={(ev, data) => this.setState({
                  level: Number(ev.target.value),
                })}
              />
            </div>
        </div>
        <Button
          className="path-finder__btn"
          onClick={() => this.handleOnFindPath()}
          color="red"
        >
          Find
        </Button>
        <Button
          basic
          color="red"
          className="path-finder__btn"
          onClick={onClear}
        >
          Clear Path
        </Button>
      </div>
    );
  }
}

PathFinder.propTypes = {
  onFindPath: PropTypes.func.isRequired,
  nodeOptions: PropTypes.array,
  onClear: PropTypes.func.isRequired,
};

export default PathFinder;
