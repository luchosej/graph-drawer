/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { GraphView } from 'react-digraph';
import { cloneDeep } from 'lodash';
import ActionMenu from 'components/ActionMenu';
import SimpleModal from 'components/SimpleModal';
import StatusBar from 'components/StatusBar';
import getRandomInt from 'utils/randomNumber';
import dijkstra from 'utils/dijkstra';
// graph config
import {
  GraphConfig,
  NODE_KEY,
  exampleGraph,
} from 'utils/graphConfig';

import './styles.scss';


class Digraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: {
        nodes: [],
        edges: [],
      },
      selected: undefined,
      root: undefined,
      node: 0,
      openDelete: false,
      openViewExample: false,
      openFindPathError: false,
      openResetAll: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEdge = this.handleCreateEdge.bind(this);
    this.handleOnClear = this.handleOnClear.bind(this);
    this.handleOnFindPath = this.handleOnFindPath.bind(this);
    this.loadExampleGraph = this.loadExampleGraph.bind(this);
    this.onCreateEdge = this.onCreateEdge.bind(this);
    this.onCreateNode = this.onCreateNode.bind(this);
    this.onDeleteEdge = this.onDeleteEdge.bind(this);
    this.onDeleteNode = this.onDeleteNode.bind(this);
    this.onResetAllClick = this.onResetAllClick.bind(this);
    this.onSelectNode = this.onSelectNode.bind(this);
    this.onUpdateNode = this.onUpdateNode.bind(this);
    this.onViewExampleClick = this.onViewExampleClick.bind(this);
    this.findNode = this.findNode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  findNode(id) {
    const { graph: { nodes } } = this.state;
    const node = nodes.find(node => node.id === id);
    return node;
  }

  addRootNode(nodeId) {
    this.setState({
      root: nodeId,
    });
  } 

  getNodeIndex(searchNode) {
    if (searchNode) {
      return this.state.graph.nodes.findIndex(node => {
        return node[NODE_KEY] === searchNode[NODE_KEY];
      });
    }
  }

  getEdgeIndex(searchEdge) {
    const { graph: { edges } } = this.state;
    return edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  onCreateNode(x, y, _, title) {
    const { graph, node } = this.state;
    const newNode = {
      id: Date.now(),
      x,
      y,
      title: title || node,
      type: 'empty',
    }

    if (graph.nodes.length === 0) {
      this.addRootNode(newNode.id);
      newNode.title = title || 'Root';
      newNode.type = 'special';
    }

    graph.nodes = [...graph.nodes, newNode];
    this.setState({ graph, node: node + 1 });
  }

  onSelectNode(viewNode) {
    this.setState({
      selected: viewNode,
    });
  }

  onUpdateNode = (viewNode) => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph });
  };

  onCreateEdge(sourceViewNode, targetViewNode) {
    const { graph } = this.state;
    
    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type: "emptyEdge",
      weight: 1,
    };

    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      this.setState({
        graph,
        selected: viewEdge,
      });
    }
  }

  onDeleteNode = (viewNode, nodeId, nodeArr) => {
    const { graph, root } = this.state;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    if (nodeId === root && nodeArr.length > 0) {
      this.addRootNode(nodeArr[0].id);
      nodeArr[0].title = 'Root';
    }

    graph.nodes = nodeArr;
    graph.edges = newEdges;

    this.setState({ graph, selected: null });
  };

  onDeleteEdge = (viewEdge, edges) => {
    const { graph } = this.state;

    graph.edges = edges;
    this.setState({
      graph,
      selected: null,
    });
  };

  onSelectEdge = (viewEdge) => {
    this.setState({ selected: viewEdge });
  };

  // Called when an edge is reattached to a different target.
  onSwapEdge = (
    sourceViewNode,
    targetViewNode,
    viewEdge,
  ) => {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;
    // reassign the array reference if you want the graph to re-render a swapped edge
    graph.edges = [...graph.edges];

    this.setState({
      graph,
      selected: edge,
    });
  };

  handleChange(ev) {
    const { selected, graph } = this.state;
    if (selected) {
      const nodeIndex = this.getNodeIndex(selected);
      const updatedNode = {
        ...graph.nodes[nodeIndex],
        title: ev.target.value,
      };
      graph.nodes[nodeIndex] = updatedNode;
      this.setState({
        graph,
        inputValue: ev.target.value,
      });
    }
  }

  handleCreateEdge(from, to) {
    const fromNode = this.findNode(from);
    const toNode = this.findNode(to);
    this.onCreateEdge(fromNode, toNode);
  }

  fillNode(nodeId) {
    const nodeToFill = {
      ...this.findNode(nodeId),
      type: 'customEmpty',
    };
    this.onUpdateNode(nodeToFill);
  }

  handleOnFindPath(toNodeId, level) {
    const { graph: { nodes, edges }, root} = this.state;
    if (toNodeId) {
      let path = [];
      this.handleOnClear();
      if (!!level) {
        const toNode = this.findNode(toNodeId);
        path = this.handleDfs(toNode, level);
        if (path) {
          path.forEach(n => this.fillNode(n.id));
        } else {
          this.setState({
            openFindPathError: true,
          });
        }
      } else {
        path = dijkstra(nodes, edges, root);
        const toNode = path.find(n => n.id === toNodeId);
        if (toNode.previous || toNodeId === root) {
          this.handleOnFillPath(toNodeId, path, root);
        }
      }
    }
  }

  handleOnFillPath(toNodeId, path, root) {
    const toNode = path.find(node => node.id === toNodeId);
    this.fillNode(toNodeId);
    if (!!toNode.previous) {
      this.handleOnFillPath(toNode.previous, path);
    }
  }

  handleOnClear() {
    const { graph } = this.state;
    const { nodes } = graph;

    const clearedNodes = nodes.map((node, i) => ({
      ...node,
      type: i === 0 ? 'special' : 'empty',
    }));
    graph.nodes = clearedNodes;
    this.setState({
      graph,
      selected: undefined,
    });
  }

  loadExampleGraph() {
    const newGraph = cloneDeep(exampleGraph);
    this.setState({
      graph: newGraph,
      openViewExample: false,
      root: newGraph.nodes[0].id,
    });
  }

  onViewExampleClick() {
    this.setState({
      openViewExample: true,
    });
  }

  handleDfs(dest, level) {
    const { graph: { nodes, edges }} = this.state;
    let explored = new Set();
    let path = [];
    let savePaths = [];
    let path_index = 0;

    this.deepFirstSearch(nodes[0], dest, edges, explored, path, path_index, savePaths, () => this.findNode);
    const uniq = savePaths.map(path => {
      const destIndex = path.findIndex(n => n.id === dest.id);
      return path.slice(0, destIndex + 1);
    });
    const levelPath_ = uniq.filter(p => p.length === level);
    const levelPath = levelPath_[getRandomInt(levelPath_.length)];
    return levelPath; 
  }

  deepFirstSearch(source, target, edges, explored, path, path_index, savePaths, ) {
    explored.add(source);
    path[path_index] = source;
    path_index++;
  
    if (source.id === target.id) {
      savePaths.push([...path]);
    } else {
      const neighbors_ = edges.filter(ed => ed.source === source.id);
      const neighbors = neighbors_.map(n => this.findNode(n.target));
  
      neighbors.forEach(n => {
        if (!explored.has(n)) {
          this.deepFirstSearch(n, target, edges, explored, path, path_index, savePaths);
        }
      })
    }
    path_index--;
    explored.delete(source);
  }

  onResetAllClick() {
    this.setState({
      openResetAll: true,
    })
  }

  resetAll() {
    this.setState({
      graph: {
        nodes: [],
        edges: [],
      },
      openResetAll: false,
      selected: undefined,
    });
  }

  onChangeName(newName, id) {
    const { graph } = this.state;
    const nodeIndex = graph.nodes.findIndex(n => n.id === id);
    graph.nodes[nodeIndex].title = newName;
    this.onUpdateNode(graph.nodes[nodeIndex]);
  }

  handleSelected(selected) {
    let newSeleted = {
      ...selected,
    };
    if (!selected.id) {
      const to = this.findNode(selected.target);
      const from = this.findNode(selected.source);
      newSeleted = {
        to: to.title,
        from: from.title,
      }
    }
    return newSeleted;
  }

  render() {
    const {
      graph: {
        nodes,
        edges,
      },
      selected,
      openViewExample,
      openFindPathError,
      openResetAll,
    } = this.state;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    const nodeOptions = nodes.map(node => ({
      key: node.id,
      value: node.id,
      text: node.title,
    }));

    return (
      <div id='graph' className="graph">
        <ActionMenu
          selected={selected}
          nodeOptions={nodeOptions}
          handleCreateEdge={this.handleCreateEdge}
          handleOnFindPath={this.handleOnFindPath}
          handleOnClear={this.handleOnClear}
          onViewExampleClick={this.onViewExampleClick}
          onResetAllClick={this.onResetAllClick}
          onCreateNode={(title) => this.onCreateNode(1000, 500, null, title)}
        />
        {selected && <StatusBar selected={this.handleSelected(selected)} onChangeName={this.onChangeName} />}
        <GraphView  ref='GraphView'
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          onSelectNode={this.onSelectNode}
          onCreateNode={this.onCreateNode}
          onUpdateNode={this.onUpdateNode}
          onDeleteNode={this.onDeleteNode}
          onSelectEdge={this.onSelectEdge}
          onCreateEdge={this.onCreateEdge}
          onSwapEdge={this.onSwapEdge}
          onDeleteEdge={this.onDeleteEdge}
          maxTitleChars={50}
        />
        <SimpleModal
          open={openViewExample}
          header="View Example"
          content="Will delete all nodes. Are you sure? Can not undo"
          onCancel={() => this.setState({
            openViewExample: false,
          })}
          onConfirm={this.loadExampleGraph}
        />
        <SimpleModal
          open={openFindPathError}
          header="Error"
          content="Not found path with these levels"
          onConfirm={() => this.setState({
            openFindPathError: false,
          })}
          confirmText="Ok"
        />
        <SimpleModal
          open={openResetAll}
          header="Reset All"
          content="Will delete all nodes. Are you sure? Can not undo"
          onConfirm={() => this.resetAll()}
          onCancel={() => this.setState({
            openResetAll: false,
          })}
          confirmText="Ok"
        />
      </div>
    );
  }

}

export default Digraph;
