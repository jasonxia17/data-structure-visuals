import React from 'react';
import TreeNode from './TreeNode'
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <svg>
        <TreeNode nodeData={12} xCoord={90} yCoord={200}/>
        <TreeNode nodeData={15} xCoord={300} yCoord={200}/>
      </svg>
    </div>
  );
}

export default App;
