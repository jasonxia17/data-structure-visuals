import React from 'react';

interface Props {
  nodeData: number;
  xCoord: number;
  yCoord: number;
}

const TreeNode: React.FC<Props> = ({ nodeData, xCoord, yCoord }) => {
  return (
    <g>
      <circle cx={xCoord} cy={yCoord} r={25} />
      <text x={xCoord} y={yCoord}>{nodeData}</text>
    </g>
  );
}

export default TreeNode;
