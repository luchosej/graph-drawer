import React from 'react';

const RootShape = (
  <symbol viewBox="-27 0 154 154" id="special" width="164" height="164">
    <rect transform="translate(50) rotate(45)" width="109" height="109" />
  </symbol>
);

const normalShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="empty">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const pathNode = (
  <symbol viewBox="0 0 154 154" id="customEmpty">
    <circle cx="77" cy="77" r="76" fill="#1e90ff"/>
  </symbol>
);

const edgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge">
    <rect
      transform="rotate(45)"
      x="27.5"
      y="-7.5"
      width="15"
      height="15"
      fill="currentColor"
    />
  </symbol>
);

export const GraphConfig =  {
  NodeTypes: {
    empty: { // required to show empty nodes
      typeText: "Node",
      shapeId: "#empty", // relates to the type property of a node
      shape: normalShape
    },
    customEmpty: {
      typeText: "Node",
      shapeId: "#customEmpty", // relates to the type property of a node
      shape: pathNode
    }, 
    special: {
      shape: RootShape,
      shapeId: '#special',
      typeText: 'Root',
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {  // required to show empty edges
      shapeId: "#emptyEdge",
      shape: edgeShape
    }
  }
}

export const exampleGraph = {
  nodes: [
    {id: 1563062525326, x: 156.968505859375, y: 467.9852294921875, title: "Sistema", type: "special"},
    {id: 1563062525702, x: 409.3428039550781, y: 470.104736328125, title: "Banco", type: "empty"},
    {id: 1563062538838, x: 669.6103515625, y: 466.0799865722656, title: "Cr", type: "empty"},
    {id: 1563062541657, x: 679.00146484375, y: 107.8766860961914, title: "Cuenta Contable", type: "empty"},
    {id: 1563062542776, x: 911.095703125, y: 164.2232666015625, title: "Sucursal", type: "empty"},
    {id: 1563062543416, x: 1005.0067138671875, y: 373.5105895996094, title: "Web", type: "empty"},
    {id: 1563062544584, x: 1025.1304931640625, y: 572.0652465820312, title: "Tdd", type: "empty"},
    {id: 1563062545369, x: 931.219482421875, y: 765.2535400390625, title: "Tdc", type: "empty"},
    {id: 1563062546537, x: 712.9448852539062, y: 868.9682006835938, title: "Atm", type: "empty"},
    {id: 1563062552899, x: 1242.46728515625, y: 258.1342468261719, title: "Cliente", type: "empty"},
    {id: 1563062553707, x: 1555.9091796875, y: 450.9859619140625, title: "Cuenta", type: "empty"},
    {id: 1563062579784, x: 1885.086669921875, y: 454.0057067871094, title: "Plastico", type: "empty"},
  ],
  edges: [
    {source: 1563062525326, target: 1563062525702, type: "emptyEdge", weight: 1},
    {source: 1563062525702, target: 1563062538838, type: "emptyEdge", weight: 1},
    {source: 1563062538838, target: 1563062541657, type: "emptyEdge", weight: 1},
    {source: 1563062538838, target: 1563062542776, type: "emptyEdge", weight: 1},
    {source: 1563062538838, target: 1563062543416, type: "emptyEdge", weight: 1},
    {source: 1563062538838, target: 1563062544584, type: "emptyEdge", weight: 1},
    {source: 1563062538838, target: 1563062545369, type: "emptyEdge", weight: 1},
    {source: 1563062538838, target: 1563062546537, type: "emptyEdge", weight: 1},
    {source: 1563062542776, target: 1563062552899, type: "emptyEdge", weight: 1},
    {source: 1563062552899, target: 1563062553707, type: "emptyEdge", weight: 1},
    {source: 1563062545369, target: 1563062553707, type: "emptyEdge", weight: 1},
    {source: 1563062553707, target: 1563062579784, type: "emptyEdge", weight: 1},
    {source: 1563062544584, target: 1563062553707, type: "emptyEdge", weight: 1},
  ],
};

export const NODE_KEY = "id"
