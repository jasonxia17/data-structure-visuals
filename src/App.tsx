import React, { useState } from 'react';
import TreeNode from './TreeNode'
import './App.css';

interface Node {
  nodeData: number;
  xCoord: number;
  yCoord: number;
  leftChildId: number | null;
  rightChildId: number | null;
  isRoot: boolean;
}

const App: React.FC = () => {
  const [nodeList, setNodeList] = useState({} as { [key: number]: Node });
  const [currId, setCurrId] = useState(0);

  const createNewNode = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }

    const newNode : Node = {
      nodeData: 0,
      xCoord: e.clientX,
      yCoord: e.clientY,
      leftChildId: null,
      rightChildId: null,
      isRoot: true,
    };

    setNodeList({...nodeList, [currId]: newNode});
    setCurrId(currId + 1);
    console.log(nodeList);
  }

  return (
    <div className="App">
      <svg onMouseDown={createNewNode}>
        {Object.values(nodeList).map(props => <TreeNode {...props}/>)}
      </svg>
    </div>
  );
}

export default App;
