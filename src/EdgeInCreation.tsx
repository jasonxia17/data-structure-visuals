import React from 'react';
import { NodeMap } from './App';

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
  const x = (currEdgeDir === "left") ? Math.min(xCoord, mousePos.x) : Math.max(xCoord, mousePos.x);
  const y = Math.max(yCoord, mousePos.y);

  return (
    <line
      className="edge-in-creation"
      x1={nodeMap[currEdgeParent].xCoord} y1={nodeMap[currEdgeParent].yCoord}
      x2={x} y2={y} />
  );
}

export default EdgeInCreation;
