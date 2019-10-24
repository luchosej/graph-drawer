import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import './styles.scss';

const StatusBar = ({ selected, onChangeName }) => {
  const {
    id,
    title,
    x,
    y,
    to,
    from,
  } = selected;
  const [name, setName] = useState(title);

  useEffect(() => {
    setName(selected.title);;
  }, [selected.title]);

  const handleOnValueChange = (ev) => {
    const { target: { value } } = ev;
    setName(value);
    onChangeName(value, id);
  }
  return (
    <div className="status-bar">
      <div>{id ? 'Node' : 'Edge'}</div>
      {id && (
        <div className="status-bar__name">
          Name:
          <div className="status-bar__name-input">
            <Input
              fluid
              size="mini"
              value={name}
              onChange={(ev) => handleOnValueChange(ev)}
            />
          </div>
        </div>
      )}
      <div>
        {id ? `x: ${Math.trunc(x)}` : `from: ${from}`} 
      </div>
      <div>
        {id ? `y: ${Math.trunc(y)}` : `to: ${to}`}
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  title: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default StatusBar;