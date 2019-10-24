import React, { Component } from 'react';
import { Select, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EdgeIcon from 'assets/edge.svg';

import './styles.scss';

class EdgeCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
    }
  }

  handleOnCreateEdge() {
    const { onCreateEdge } = this.props;
    const { from, to } = this.state;
    if (from && to) {
      onCreateEdge(from, to);
      this.setState({
        from: '',
        to: '',
      })
    } 
  }

  render() {
    const { nodeOptions } = this.props;
    const { from, to } = this.state;
    return (
      <div className="edge-creator">
        <img className="edge-creator__icon" src={EdgeIcon} alt="edge icon" />
        <div className="edge-creator__title">
          Create Edge
        </div>
        <div>
          <div className="edge-creator__selector">
            <div className="edge-creator__selector-from">
              <span>
                from
              </span>
              <Select
                className="edge-creator__selector-select"
                compact
                options={nodeOptions}
                placeholder="from"
                value={from}
                onChange={(ev, data) => this.setState({
                  from: data.value
                })}
              />
            </div>
          </div>
          <div className="edge-creator__selector">
            <div className="edge-creator__selector-to">
              <span>
                to
              </span>
              <Select
                className="edge-creator__selector-select"
                compact
                options={nodeOptions}
                placeholder="to"
                value={to}
                onChange={(ev, data) => this.setState({
                  to: data.value
                })}
              />
            </div>
          </div>
        <Button
          className="edge-creator__selector-add"
          color="red"
          onClick={() => this.handleOnCreateEdge()}
        >
          Add
        </Button>
        </div>
      </div>
    );
  }
}

EdgeCreator.propTypes = {
  onCreateEdge: PropTypes.func.isRequired,
  nodeOptions: PropTypes.array,
};

export default EdgeCreator;
