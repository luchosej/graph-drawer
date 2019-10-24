import React from 'react';
import cn from 'classnames';

import './styles.scss';

const ActionIcon = ({
  children,
  icon,
  title,
  selected,
}) => {
  return (
    <div className={cn('action-icon', {
      'action-icon--selected': selected,
    })}>
      <img
        alt="action icon"
        src={icon}
      />
    </div>
  );
};

export default ActionIcon;