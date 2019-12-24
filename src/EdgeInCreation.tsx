import React from 'react';
import { NodeMap, constrainChildPos } from './App';

interface Props {
  nodeMap: NodeMap;
  currEdgeParent: number | null;
  currEdgeDir: "left" | "right";
  mousePos: { x: number, y: number };
}

const EdgeInCreation: React.FC<Props> = ({ nodeMap, currEdgeParent, currEdgeDir, mousePos }) => {
  if (currEdgeParent === null) {
    return null;
  }

  const { xCoord, yCoord } = nodeMap[currEdgeParent]
  const { x, y } = constrainChildPos(mousePos.x, mousePos.y, xCoord, yCoord, currEdgeDir);

  return (
    <line
      className="edge-in-creation"
      x1={nodeMap[currEdgeParent].xCoord} y1={nodeMap[currEdgeParent].yCoord}
      x2={x} y2={y} />
  );
}

export default EdgeInCreation;
