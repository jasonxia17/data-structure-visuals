import React from 'react';
import { NodeMap } from './App';

interface Props {
  nodeMap: NodeMap;
  parentID: number;
  childID: number;
  onClick: () => void;
}

const Edge: React.FC<Props> = ({ nodeMap, parentID, childID, onClick }) => {
  return (
    <line
      className="edge"
      x1={nodeMap[parentID].xCoord} y1={nodeMap[parentID].yCoord}
      x2={nodeMap[childID].xCoord} y2={nodeMap[childID].yCoord} 
      onClick={onClick}/>
  );
}

export default Edge;
