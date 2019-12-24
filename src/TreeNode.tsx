import React from 'react';
import { NodeMap } from './App';

interface Props {
  nodeID: number;
  nodeMap: NodeMap;
  changeData: (nodeID: number, newData: string) => void;
}

const TreeNode: React.FC<Props> = ({ nodeID, nodeMap, changeData }) => {
  const { xCoord, yCoord, nodeData } = nodeMap[nodeID];

  return (
    // tabIndex enables onKeyPress event listener
    <g tabIndex={0} onKeyDown={e => {
      if (e.key === "Backspace") {
        changeData(nodeID, "");
        return;
      }

      if (nodeData.length >= 4) {
        return;
      }

      if ("0123456789".includes(e.key) ||
        (e.key === "-" && nodeData.length === 0) ||
        (e.key === "." && !nodeData.includes("."))) {

        changeData(nodeID, nodeData + e.key);
      }
    }}>
      <circle cx={xCoord} cy={yCoord} r={40} />
      <text x={xCoord} y={yCoord}>{nodeData}</text>
    </g>
  );
}

export default TreeNode;
