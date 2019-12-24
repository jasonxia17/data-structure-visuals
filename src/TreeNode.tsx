import React from 'react';
import { NodeMap } from './App';

interface Props {
  nodeID: number;
  nodeMap: NodeMap;
  changeData: (nodeID: number, newData: number) => void;
}

const TreeNode: React.FC<Props> = ({ nodeID, nodeMap, changeData }) => {
  const { xCoord, yCoord, nodeData } = nodeMap[nodeID];
  
  return (
    // tabIndex enables onKeyPress event listener
    <g tabIndex={0} onKeyPress={e => {
      console.log('hELLO')
      console.log(parseInt(String(nodeData) + e.key))
      changeData(nodeID, parseInt(String(nodeData) + e.key));
    }}>
      <circle cx={xCoord} cy={yCoord} r={25} />
      <text x={xCoord} y={yCoord}>{nodeData}</text>
    </g>
  );
}

export default TreeNode;
