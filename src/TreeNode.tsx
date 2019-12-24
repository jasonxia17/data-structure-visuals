import React, { Fragment } from 'react';
import { NodeMap } from './App';

interface Props {
  nodeID: number;
  nodeMap: NodeMap;
  currEdgeParent: number | null;
  currEdgeDir: "left" | "right";
  changeData: (nodeID: number, newData: string) => void;
  handleSelectStub: (nodeID: number, edgeDir: "left" | "right") => void;
}

const TreeNode: React.FC<Props> = ({ nodeID, nodeMap, changeData,
  handleSelectStub, currEdgeParent, currEdgeDir }) => {

  const { xCoord, yCoord, nodeData, leftChildId, rightChildId } = nodeMap[nodeID];

  return (
    // tabIndex enables onKeyPress event listener
    <Fragment>
      {/* left child stub, only draw the stub if the child hasn't already been created and
          the user isn't trying to set that edge right now. */}
      {leftChildId === null && !(currEdgeParent === nodeID && currEdgeDir === "left") &&
        <line x1={xCoord} y1={yCoord} x2={xCoord - 50} y2={yCoord + 50}
          onClick={() => handleSelectStub(nodeID, "left")} />
      }

      {/* right child stub */}
      {rightChildId === null && !(currEdgeParent === nodeID && currEdgeDir === "right") &&
        <line x1={xCoord} y1={yCoord} x2={xCoord + 50} y2={yCoord + 50}
          onClick={() => handleSelectStub(nodeID, "right")} />}

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
        <circle cx={xCoord} cy={yCoord} r={45} />
        <text x={xCoord} y={yCoord}>{nodeData}</text>
      </g>
    </Fragment>
  );
}

export default TreeNode;
