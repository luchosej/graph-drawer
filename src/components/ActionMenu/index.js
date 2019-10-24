import React from 'react';

import ActionButton from 'components/ActionButton';
import EdgeCreator from 'components/EdgeCreator';
import PathFinder from 'components/PathFinder';
import Helper from 'components/Helper';
import NodeCreator from 'components/NodeCreator';
// icons
import LinkIcon from 'assets/link.svg';
import PathIcon from 'assets/path.svg';
import HelpIcon from 'assets/help.svg';
import ViewIcon from 'assets/view.svg';
import ResetIcon from 'assets/reset.svg';
import AddIcon from 'assets/add.svg';

import './styles.scss';

const ActionMenu = ({
  nodeOptions,
  handleCreateEdge,
  handleOnClear,
  handleOnFindPath,
  onViewExampleClick,
  onResetAllClick,
  onCreateNode,
  selected,
}) => {
  const NodeCreatorComponent = (
    <NodeCreator onCreateNode={(e) => onCreateNode(e)}/>
  );
  const EdgeCreatorComponent = (
    <EdgeCreator
      onCreateEdge={handleCreateEdge}
      nodeOptions={nodeOptions}
    />
  );
  const PathFinderComponent = (
    <PathFinder
      selected={selected}
      nodeOptions={nodeOptions}
      onFindPath={handleOnFindPath}
      onClear={handleOnClear}
    />
  );
  const HelperComponent = (
    <Helper />
  );
  return (
    <div className="action-menu">
      <ActionButton
        action="New Node"
        actionIcon={AddIcon}
        target={NodeCreatorComponent}
      />
      <ActionButton
        action="Create edge"
        actionIcon={LinkIcon}
        target={EdgeCreatorComponent}
      />
      <ActionButton
        action="Find Path"
        actionIcon={PathIcon}
        target={PathFinderComponent}
      />
      <ActionButton
        action="Reset All"
        actionIcon={ResetIcon}
        onClick={onResetAllClick}
      />
      <ActionButton
        action="View Example"
        actionIcon={ViewIcon}
        onClick={onViewExampleClick}
      />
      <ActionButton
        action="Help"
        actionIcon={HelpIcon}
        target={HelperComponent}
      />
    </div>
  );
};

export default ActionMenu;