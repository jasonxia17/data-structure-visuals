import React from 'react';
import { NodeMap } from './App';

interface Props {
  nodeMap: NodeMap;
  currEdgeParent: number | null;
  currEdgeDir: "left" | "right";
  mousePos: { x: number, y: number };
}

const EdgeInCreation: React.FC<Props> = ({ nodeMap, currEdgeParent, mousePos }) => {
  if (currEdgeParent === null) {
    return null;
  }

  return (
    <line
      className="edge-in-creation"
      x1={nodeMap[currEdgeParent].xCoord} y1={nodeMap[currEdgeParent].yCoord}
      x2={mousePos.x} y2={mousePos.y} />
  );
}

export default EdgeInCreation;
