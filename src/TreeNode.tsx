import React, { Fragment } from 'react';
import { NodeMap, constrainChildPos } from './App';

interface Props {
  nodeID: number;
  nodeMap: NodeMap;
  currEdgeParent: number | null;
  currEdgeDir: "left" | "right";
  changeData: (nodeID: number, newData: string) => void;
  handleSelectStub: (nodeID: number, edgeDir: "left" | "right") => void;
  /* Create edge with this node as child */
  createEdge: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const TreeNode: React.FC<Props> = (
  { nodeID, nodeMap, changeData,
    handleSelectStub, currEdgeParent, currEdgeDir, createEdge, onMouseDown }) => {

  const { xCoord, yCoord, nodeData, leftChildId, rightChildId } = nodeMap[nodeID];

  const isRoot = Object.values(nodeMap)
    .every(({ leftChildId, rightChildId }) => leftChildId !== nodeID && rightChildId !== nodeID);

  const isValidChild = isRoot && (currEdgeParent !== null) &&
    constrainChildPos(xCoord, yCoord, nodeMap[currEdgeParent].xCoord,
      nodeMap[currEdgeParent].yCoord, currEdgeDir).isPositionValid;

  return (
    // tabIndex enables onKeyPress event listener
    <Fragment>
      {/* left child stub, only draw the stub if the child hasn't already been created and
          the user isn't trying to set that edge right now. */}
      {leftChildId === null && !(currEdgeParent === nodeID && currEdgeDir === "left") &&
        <line x1={xCoord} y1={yCoord} x2={xCoord - 50} y2={yCoord + 50}
          onClick={e => { handleSelectStub(nodeID, "left"); e.stopPropagation() }} />
      }

      {/* right child stub */}
      {rightChildId === null && !(currEdgeParent === nodeID && currEdgeDir === "right") &&
        <line x1={xCoord} y1={yCoord} x2={xCoord + 50} y2={yCoord + 50}
          onClick={e => { handleSelectStub(nodeID, "right"); e.stopPropagation() }} />}

      <g className={isValidChild ? "valid-child" : ""} tabIndex={0}
        onKeyDown={e => {
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
        }}

        onClick={() => {
          if (isValidChild) {
            createEdge()
          }
        }}
        
        onMouseDown={onMouseDown}>
        <circle cx={xCoord} cy={yCoord} r={45} />
        <text x={xCoord} y={yCoord}>{nodeData}</text>
      </g>
    </Fragment>
  );
}

export default TreeNode;
