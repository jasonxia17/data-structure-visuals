import React, { useState, useEffect, Fragment } from 'react';
import TreeNode from './TreeNode';
import EdgeInCreation from './EdgeInCreation';
import Edge from './Edge';
import './App.css';

interface Node {
  nodeData: string;
  xCoord: number;
  yCoord: number;
  leftChildId: number | null;
  rightChildId: number | null;
}

export type NodeMap = { [key: number]: Node };

export const constrainChildPos = (childX: number, childY: number,
  parentX: number, parentY: number, dir: "left" | "right") => {

  let deltaX = childX - parentX;
  const deltaXSign = dir === "left" ? -1 : 1;
  deltaX *= deltaXSign;
  deltaX = Math.max(60, deltaX);
  deltaX *= deltaXSign;

  return {
    x: parentX + deltaX,
    y: parentY + 125,
  };
}

const getAllIdsinSubtree = (subrootId: number | null, nodeMap: NodeMap): number[] => {
  if (subrootId === null) {
    return [];
  }

  return [subrootId]
    .concat(getAllIdsinSubtree(nodeMap[subrootId].leftChildId, nodeMap))
    .concat(getAllIdsinSubtree(nodeMap[subrootId].rightChildId, nodeMap))
}

/**
 * nodeMap is modified in place. 
 */
const positionSubtree = (subrootId: number, x: number, y: number, nodeMap: NodeMap) => {
  const dx = x - nodeMap[subrootId].xCoord;
  const dy = y - nodeMap[subrootId].yCoord;

  getAllIdsinSubtree(subrootId, nodeMap).forEach(id => {
    nodeMap[id].xCoord += dx;
    nodeMap[id].yCoord += dy;
  })
}

const App: React.FC = () => {
  const [nodeMap, setNodeMap] = useState({} as NodeMap);
  const [currEdgeParent, setCurrEdgeParent] = useState(null as number | null);
  const [currEdgeDir, setCurrEdgeDir] = useState("left" as "left" | "right");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [draggedNodeId, setDraggedNode] = useState(null as number | null);
  const [grabOffset, setGrabOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const url = new URL(window.location.href);
    const data = url.searchParams.get("data");
    if (data) {
      setNodeMap(JSON.parse(data));
    }
  }, []) // empty array => componentDidMount, never update

  useEffect(() => {
    const callback = () => setDraggedNode(null);
    document.addEventListener("mouseup", callback);
    return () => document.removeEventListener("mouseup", callback);
  }, [])

  const createNewNode = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }

    const newNode: Node = {
      nodeData: "",
      xCoord: e.pageX,
      yCoord: e.pageY,
      leftChildId: null,
      rightChildId: null,
    };

    let currId = 0;
    while (currId in nodeMap) {
      ++currId;
    }
    setNodeMap({ ...nodeMap, [currId]: newNode });
  }

  const createNewEdge = (parentId: number, childId: number) => {
    const newNodeMap: NodeMap = JSON.parse(JSON.stringify(nodeMap));
    if (currEdgeDir === "left") {
      newNodeMap[parentId].leftChildId = childId;
    } else {
      newNodeMap[parentId].rightChildId = childId;
    }
    setNodeMap(JSON.parse(JSON.stringify(newNodeMap)));

    const parNode = newNodeMap[parentId];
    const childNode = newNodeMap[childId];
    const { x : targetX, y : targetY } = constrainChildPos(childNode.xCoord, childNode.yCoord,
      parNode.xCoord, parNode.yCoord, currEdgeDir);
    
    const animateCallback = () => {
      const dx = targetX - childNode.xCoord;
      const dy = targetY - childNode.yCoord;

      if (dx === 0 && dy === 0) {
        return;
      }
      
      if (dx !== 0) {
        positionSubtree(childId, childNode.xCoord + Math.sign(dx), childNode.yCoord, newNodeMap);
      } else if (dy !== 0) {
        positionSubtree(childId, childNode.xCoord, childNode.yCoord + Math.sign(dy), newNodeMap);
      }

      setNodeMap(JSON.parse(JSON.stringify(newNodeMap)));
      window.requestAnimationFrame(animateCallback);
    }
    window.requestAnimationFrame(animateCallback);   
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.pageX, y: e.pageY });

    if (draggedNodeId !== null) {
      let x = e.pageX + grabOffset.x;
      let y = e.pageY + grabOffset.y;

      let parNode = Object.values(nodeMap).find(node =>
        node.leftChildId === draggedNodeId || node.rightChildId === draggedNodeId);

      if (parNode !== undefined) {
        const dir = parNode.leftChildId === draggedNodeId ? "left" : "right";
        ({ x, y } = constrainChildPos(x, y, parNode.xCoord, parNode.yCoord, dir));
      }

      const newNodeMap = JSON.parse(JSON.stringify(nodeMap));
      positionSubtree(draggedNodeId, x, y, newNodeMap);
      setNodeMap(newNodeMap);
    }
  }

  const changeData = (nodeID: number, newData: string) => {
    setNodeMap({ ...nodeMap, [nodeID]: { ...nodeMap[nodeID], nodeData: newData } });
  }

  const handleSelectStub = (nodeID: number, edgeDir: "left" | "right") => {
    setCurrEdgeParent(nodeID);
    setCurrEdgeDir(edgeDir);
  }

  const copyPermalinkToClipboard = () => {
    const permalink = window.location.origin + window.location.pathname +
      "?data=" + encodeURIComponent(JSON.stringify(nodeMap));
    navigator.clipboard.writeText(permalink);
  }

  let className = currEdgeParent === null ? "no-edge-in-creation" : "edge-in-creation";
  className += " wrapper";
  if (draggedNodeId !== null) {
    className += " drag-in-progress";
  }

  return (
    <div className={className}>
      <svg
        onMouseMove={handleMouseMove}
        onDoubleClick={createNewNode}
        onClick={() => setCurrEdgeParent(null)}
      >

        {Object.keys(nodeMap)
          .map(nodeID => parseInt(nodeID))
          .map(nodeID => {
            const { leftChildId, rightChildId } = nodeMap[nodeID];
            return (
              <Fragment key={nodeID}>
                {leftChildId !== null &&
                  <Edge nodeMap={nodeMap} parentID={nodeID} childID={leftChildId}
                    onClick={() =>
                      setNodeMap({ ...nodeMap, [nodeID]: { ...nodeMap[nodeID], leftChildId: null } })}
                  />}

                {rightChildId !== null &&
                  <Edge nodeMap={nodeMap} parentID={nodeID} childID={rightChildId}
                    onClick={() =>
                      setNodeMap({ ...nodeMap, [nodeID]: { ...nodeMap[nodeID], rightChildId: null } })}
                  />}
              </Fragment>
            );
          })}

        <EdgeInCreation nodeMap={nodeMap} currEdgeParent={currEdgeParent}
          currEdgeDir={currEdgeDir} mousePos={mousePos} />

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
              handleSelectStub={handleSelectStub}

              onDelete={() => {
                const newNodeMap: NodeMap = JSON.parse(JSON.stringify(nodeMap));
                delete newNodeMap[nodeID];
                Object.values(newNodeMap).forEach(node => {
                  if (node.leftChildId === nodeID) node.leftChildId = null;
                  if (node.rightChildId === nodeID) node.rightChildId = null;
                });

                setNodeMap(newNodeMap);
              }}

              onMouseDown={e => {
                if (currEdgeParent !== null) {
                  return;
                }

                setDraggedNode(nodeID);
                const x = nodeMap[nodeID].xCoord - e.pageX;
                const y = nodeMap[nodeID].yCoord - e.pageY;
                setGrabOffset({ x, y });
              }}

              createEdge={() => {
                if (currEdgeParent !== null) {
                  createNewEdge(currEdgeParent, nodeID);
                }
              }}
            />
          )}
      </svg>

      <div className="sidebar">
        <h3>Binary Search / AVL Tree</h3>
        <ul>
          <li>Double-click anywhere to create a new node</li>
          <li>Select a node and type to enter data, or BACKSPACE to clear the data</li>
          <li>To delete a node, select it and hit DELETE</li>
          <li>To create an edge, click on one of the parent's stubs. Then, click the desired child.</li>
          <li>Click on an edge to delete it</li>
          <li>Drag a node to move its entire subtree</li>
        </ul>

        <button onClick={copyPermalinkToClipboard}>Copy permalink to clipboard</button>
        <button onClick={() =>
          window.location.href = window.location.origin + window.location.pathname}>
          Clear
        </button>
        <p className="author"><i>Created by <a href="mailto:jasonx3@illinois.edu">Jason Xia</a></i></p>
      </div>
    </div>
  );
}

export default App;
