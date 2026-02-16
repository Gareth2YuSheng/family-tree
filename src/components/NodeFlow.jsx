import { Background, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import React, { useState, useEffect, useMemo } from 'react';
import PersonNode from './nodes/PersonNode';
import UnionNode from './nodes/UnionNode';
import fetchFake from './testFetch';
import { getLayoutedElements } from '../utils/utils';
import { buildAdjacencyGraph, findRelationshipPath } from '../utils/pathfinding';
import useIsMobile from '../hooks/useIsMobile';

import '@xyflow/react/dist/style.css';


const nodeTypes = { 
  person: PersonNode, 
  union: UnionNode 
};

export default function NodeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedPath, setSelectedPath] = useState([]); // Array of IDs in the path
  const [selection, setSelection] = useState([]); // [firstNodeId, secondNodeId]

  const isMobile = useIsMobile();

  // Fetch Data
  useEffect(() => {
    const response = fetchFake();
    // const 
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(response.data);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  // This constructs the graph ONLY when 'nodes' or 'edges' change.
  // It does NOT run when you click, drag, or select.
  const adjacencyGraph = useMemo(() => {
    // Only build if we have data
    if (nodes.length === 0 || edges.length === 0) return new Map();
    
    return buildAdjacencyGraph(nodes, edges);
  }, [nodes, edges]);

  // Calculate Path when 2 people are selected
  useEffect(() => {
    if (selection.length === 2) {
      // Use the cached graph! No rebuilding needed.
      const path = findRelationshipPath(adjacencyGraph, selection[0], selection[1]);
      
      if (path) {
        setSelectedPath(path);
      } else {
        alert("No relationship found!");
      }
    } else {
      setSelectedPath([]);
    }
  }, [selection, adjacencyGraph]); // Depend on the cached graph

  const onNodeClick = (_, node) => {
    // Ignore clicks on Union nodes or dummy nodes
    if (node.type === 'union' || node.id.startsWith('dummy')) return;

    setSelection((prev) => {
      if (prev.length === 0) return [node.id]; // Select first
      if (prev.length === 1 && prev[0] !== node.id) return [prev[0], node.id]; // Select second
      return [node.id]; // Reset and start new selection
    });
  };

  // Highlight the Path Visually
  // We use a derived state for rendering so we don't mutate the actual data
  const highlightedEdges = edges.map(edge => {
    // Check if this edge is part of the path
    // An edge is on the path if BOTH its source and target are in the path list
    const isPathEdge = selectedPath.includes(edge.source) && selectedPath.includes(edge.target);
    
    return {
      ...edge,
      style: {
        ...edge.style,
        stroke: isPathEdge ? '#2563eb' : '#b1b1b7', // Blue if active, Grey if not
        strokeWidth: isPathEdge ? 3 : 1.5,
        opacity: isPathEdge ? 1 : 0.3, // Fade out non-path edges
      },
      animated: isPathEdge, // Make the path move!
      zIndex: isPathEdge ? 1000 : 0,
    };
  });

  const highlightedNodes = nodes.map(node => {
     const isSelected = selection.includes(node.id);
     const isOnPath = selectedPath.includes(node.id);

     return {
       ...node,
       style: {
         ...node.style,
         // Highlight start/end with thick border, path nodes with shadow
         border: isSelected ? '3px solid blue' : (isOnPath ? '2px solid #2563eb' : 'none'),
         opacity: (selectedPath.length > 0 && !isOnPath) ? 0.3 : 1 // Fade others
       }
     };
  });

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      // border: '4px solid red'
    }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={highlightedNodes} // Use the highlighted versions
        edges={highlightedEdges}
        onNodeClick={onNodeClick}

        // --- DESKTOP BEHAVIOR (Standard) ---
        // Scroll = Zoom
        // Drag = Pan or Select (depending on mode)
        zoomOnScroll={!isMobile} 
        panOnScroll={isMobile}   
        
        // --- MOBILE BEHAVIOR (Touch Friendly) ---
        // Scroll = Move Canvas (Pan)
        // Drag = Move Canvas (No selection box)
        selectionOnDrag={!isMobile} // Disable box selection on mobile
        panOnDrag={true} // Always allow dragging to move
        zoomOnPinch={true} // Allow pinching on mobile/trackpads
        
        // Prevent the whole page from bouncing when scrolling the graph
        preventScrolling={true}
        
        // nodes={nodes}
        // edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        fitView
      >
        {/* <Background />
        <Controls /> */}
      </ReactFlow>
    </div>
  );
}
