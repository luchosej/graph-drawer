import React, { useState, createRef } from 'react';
import { Popup } from 'semantic-ui-react';
import ActionIcon from 'components/ActionIcon';

import './styles.scss';

const ActionButton = ({
    action,
    actionIcon,
    target,
    onClick
  }) => {
  const [open, setOpen] = useState(false);
  const contextRef = createRef()
  
  return (
    <div className="action-button">
      {target ? (
        <>
          <Popup
            flowing
            position="left center"
            open={open}
            on='click'
            onClose={() => setOpen(false)}
            trigger={(
              <div onClick={() => setOpen(!open)}>
                <ActionIcon icon={actionIcon} selected={open} />
              </div>
            )}
          >
            <div ref={contextRef}>
              {target}
            </div>
          </Popup>
          <div className="action-button__action">
            {action}
          </div>
        </>
      ) : (
        <>
          <div onClick={onClick}>
            <ActionIcon icon={actionIcon} />
          </div>
          <div className="action-button__action">
            {action}
          </div>
        </>
      )}
    </div>
  )
}

export default ActionButton;