import React, { useState, useEffect, Fragment } from 'react';
import * as mathjs from 'mathjs';
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

  const vec = [childX - parentX, childY - parentY]

  const M = dir === "left" ? [
    [-24 / 25, -7 / 25],
    [7 / 25, 24 / 25],
  ] : [
      [24 / 25, 7 / 25],
      [7 / 25, 24 / 25],
    ];

  const transformedVec = mathjs.multiply(mathjs.inv(M), vec) as number[];

  let constrainedVec = transformedVec.map(coord => Math.max(coord, 0));
  constrainedVec = mathjs.multiply(M, constrainedVec) as number[];
  constrainedVec = mathjs.add(constrainedVec, [parentX, parentY]) as number[];

  const isPositionValid = transformedVec.every(coord => coord > 0);

  return { x: constrainedVec[0], y: constrainedVec[1], isPositionValid };
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

  const getAllIdsinSubtree = (subrootId: number | null): number[] => {
    if (subrootId === null) {
      return [];
    }

    return [subrootId]
      .concat(getAllIdsinSubtree(nodeMap[subrootId].leftChildId))
      .concat(getAllIdsinSubtree(nodeMap[subrootId].rightChildId))
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

      const dx = x - nodeMap[draggedNodeId].xCoord;
      const dy = y - nodeMap[draggedNodeId].yCoord;
      const newNodeMap: NodeMap = JSON.parse(JSON.stringify(nodeMap));

      getAllIdsinSubtree(draggedNodeId).forEach(id => {
        newNodeMap[id].xCoord += dx;
        newNodeMap[id].yCoord += dy;
      })

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

              onBackspace={() => {
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
                if (currEdgeParent === null) return;
                const modifiedNode = { ...nodeMap[currEdgeParent] };
                if (currEdgeDir === "left") {
                  Object.assign(modifiedNode, { leftChildId: nodeID })
                } else {
                  Object.assign(modifiedNode, { rightChildId: nodeID })
                }

                setNodeMap({ ...nodeMap, [currEdgeParent]: modifiedNode });
              }}
            />
          )}
      </svg>

      <div className="sidebar">
        <h3>Binary Search / AVL Tree</h3>
        <ul>
          <li>Double-click anywhere to create a new node</li>
          <li>Select a node and type to enter data</li>
          <li>To delete a node, select it and hit BACKSPACE</li>
          <li>To create an edge, click on one of the parent's stubs. Then, click the desired child.
            (Child must be positioned properly relative to parent for edge to be created.)
          </li>
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
