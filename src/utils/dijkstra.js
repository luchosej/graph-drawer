/* eslint-disable no-loop-func */
import { orderBy } from 'lodash';

// Dijkstra Algorithm
export default function dijkstra(nodes, edges, root) {
  let dist = [];
  let previous = [];
  let nodesSet =  [...nodes];

  if (nodes.length > 0) {
    nodes.forEach(node => {
      dist.push({
        id: node.id,
        title: node.title,
        dist: node.id === root ? 0 : Infinity,
      });
      previous.push({
        title: node.title,
        id: node.id,
        previous: undefined,
      })});

      while (nodesSet.length > 0) {
        dist = orderBy(dist, 'dist');
        const minNode = dist.find(node => nodesSet.some(node_ => node_.id === node.id));
        const neighbors = edges.filter(ed => ed.source === minNode.id);
        let alt;
        neighbors.forEach(e => {
          alt = minNode.dist + e.weight;
          const neighborIndex = dist.findIndex(node => node.id === e.target);
          const previousIndex = previous.findIndex(node => node.id === e.target);
          if (alt < dist[neighborIndex].dist) {
            dist[neighborIndex].dist = alt;
            previous[previousIndex].previous = minNode.id;
          }
        });
        nodesSet = nodesSet.filter(n => minNode.id !== n.id);
      }
    }
  return previous;
}