import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

import './styles.scss';

const NodeCreator = ({ onCreateNode, hola }) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="node-creator">
      <div className="node-creator__title">New node</div>
      <div className="node-creator__container">
        <span className="node-creator__container-title">Name:</span>
        <Input
          size="small"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        />
      </div>
      <div className="node-creator__btn">
        <Button
          color="red"
          onClick={() => onCreateNode(value)}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

NodeCreator.propTypes = {
  onCreateNode: PropTypes.func.isRequired,
};

export default NodeCreator;