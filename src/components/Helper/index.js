import React from 'react';

import './styles.scss';

const shortCuts = [{
  action: 'Add node',
  key: 'Shift + Click',
}, {
  action: 'Delete node/edge',
  key: 'Delete key',
}];

const Helper = () => {
  return (
    <div className="helper">
      {shortCuts.map(({action, key}) => (
        <div className="helper__shortcut">
          {`- ${action}: ${key}`}
        </div>
      ))}
    </div>
  );
};

export default Helper;