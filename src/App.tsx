import React, { useState } from 'react';
import TreeNode from './TreeNode'
import './App.css';

interface Node {
  nodeData: string;
  xCoord: number;
  yCoord: number;
  leftChildId: number | null;
  rightChildId: number | null;
  isRoot: boolean;
}

export type NodeMap = { [key: number]: Node };

const App: React.FC = () => {
  const [nodeMap, setNodeMap] = useState({} as NodeMap);
  const [currId, setCurrId] = useState(0);
  const [currEdgeParent, setCurrEdgeParent] = useState(null as number | null);
  const [currEdgeDir, setCurrEdgeDir] = useState("left" as "left" | "right");

  const createNewNode = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }

    const newNode: Node = {
      nodeData: "",
      xCoord: e.clientX,
      yCoord: e.clientY,
      leftChildId: null,
      rightChildId: null,
      isRoot: true,
    };

    setNodeMap({ ...nodeMap, [currId]: newNode });
    setCurrId(currId + 1);
  }

  const changeData = (nodeID: number, newData: string) => {
    setNodeMap({ ...nodeMap, [nodeID]: { ...nodeMap[nodeID], nodeData: newData } });
  }

  const handleSelectStub = (nodeID: number, edgeDir: "left" | "right") => {
    setCurrEdgeParent(nodeID);
    setCurrEdgeDir(edgeDir);
  }

  return (
    <div className="App">
      <svg onDoubleClick={createNewNode}>
        {Object.keys(nodeMap)
          .map(nodeID => parseInt(nodeID))
          .map(nodeID =>
            <TreeNode
              key={nodeID}
              nodeID={nodeID}
              nodeMap={nodeMap}
              currEdgeParent={currEdgeParent}
              currEdgeDir={currEdgeDir}
              changeData={changeData}
              handleSelectStub={handleSelectStub} />)}
      </svg>
    </div>
  );
}

export default App;
