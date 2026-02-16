import dagre from 'dagre';
import { Position } from '@xyflow/react';

const NODE_WIDTH = 140;
const NODE_HEIGHT = 140;
const UNION_NODE_SIZE = 10; // Tiny node for the marriage connection point

const getEdgeStyle = (relationship) => {
  switch (relationship) {
    case 'Affair':
      return { stroke: 'red', strokeWidth: 2, strokeDasharray: '5,5' }; // Red Dashed
    case 'Divorce':
      return { stroke: '#ff9900', strokeWidth: 2 }; // Keep standard (Divorce is usually marked on the node)
    case 'Marriage':
    default:
      return { stroke: '#333', strokeWidth: 1.5 }; // Standard Black
  }
};

export const getLayoutedElements = (apiData, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure layout
  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: 100, // Vertical gap between generations
    nodesep: 80, // Horizontal gap between siblings
  });

  const nodes = [];
  const edges = [];

  // --- 1. Process People nodes ---
  apiData.people.forEach((person) => {
    const nodeId = person.ID.toString();    
    nodes.push({
      id: nodeId,
      type: 'person',
      data: person,
      position: { x: 0, y: 0 },
    });
    dagreGraph.setNode(nodeId, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  // --- 2. Process Unions nodes & edges ---
  const unionStyleMap = new Map();

  apiData.unions.forEach((union) => {
    const unionNodeId = `union-${union.U_ID}`;
    
    // Safely get Parent IDs for the centering calculation later
    // const hId = (union.Husband_ID && union.Husband_ID !== '?') ? union.Husband_ID.toString() : null;
    // const wId = (union.Wife_ID && union.Wife_ID !== '?') ? union.Wife_ID.toString() : null;

    // --- UPDATED LOGIC: Handle '?' by creating Dummy Nodes ---
    let hId = null;
    let wId = null;

    // Resolve Husband ID
    if (union.Husband_ID && union.Husband_ID !== '?') {
        hId = union.Husband_ID.toString();
    } else if (union.Husband_ID === '?') {
        // Create Dummy Husband
        hId = `dummy-h-${union.U_ID}`;
        nodes.push({
            id: hId,
            type: 'person', // Reuse your existing card component
            data: { Full_Name: '???', Sex: 'Male' }, // Placeholder Data
            position: { x: 0, y: 0 },
            // style: { opacity: 0.5 } // Make it look "ghostly"
        });
        dagreGraph.setNode(hId, { width: NODE_WIDTH, height: NODE_HEIGHT });
    }

    // Resolve Wife ID
    if (union.Wife_ID && union.Wife_ID !== '?') {
        wId = union.Wife_ID.toString();
    } else if (union.Wife_ID === '?') {
        // Create Dummy Wife
        wId = `dummy-w-${union.U_ID}`;
        nodes.push({
            id: wId,
            type: 'person',
            data: { Full_Name: '???', Sex: 'Female' },
            position: { x: 0, y: 0 },
            // style: { opacity: 0.5 }
        });
        dagreGraph.setNode(wId, { width: NODE_WIDTH, height: NODE_HEIGHT });
    }
    // ---------------------------------------------------------

    nodes.push({
      id: unionNodeId,
      type: 'union',
      data: { 
        ...union,
        parents: [hId, wId].filter(Boolean) // Store parent IDs here!
      },
      position: { x: 0, y: 0 },
    //   style: { width: 0, height: 0 }
    });
    dagreGraph.setNode(unionNodeId, { width: UNION_NODE_SIZE, height: UNION_NODE_SIZE });

    // Create Edges: Parents -> Union
    const relationshipStyle = getEdgeStyle(union.Relationship);

    unionStyleMap.set(unionNodeId, relationshipStyle); // Update hashmap here

    if (hId) {
       edges.push({ 
           id: `e-${hId}-${unionNodeId}`, 
           source: hId, 
           target: unionNodeId,
           type: 'step', // Force right angles
           style: relationshipStyle
       });
       dagreGraph.setEdge(hId, unionNodeId);
    }
    
    if (wId) {
       edges.push({ 
           id: `e-${wId}-${unionNodeId}`, 
           source: wId,
           target: unionNodeId,
           type: 'step', // Force right angles
           style: relationshipStyle
       });
       dagreGraph.setEdge(wId, unionNodeId);
    }
  });

  // --- 3. Process Children edges ---
  apiData.children.forEach((child) => {
    const unionNodeId = `union-${child.Union_ID}`;
    const childId = child.Child_ID.toString();
    const parentEdgeStyle = unionStyleMap.get(unionNodeId) || { stroke: 'black', strokeWidth: 1.5 };
    
    if (dagreGraph.node(unionNodeId) && dagreGraph.node(childId)) {
       const edgeId = `e-u${child.Union_ID}-${childId}`;        
       edges.push({ 
           id: edgeId, 
           source: unionNodeId, 
           target: childId,
           type: 'step',
           style: parentEdgeStyle,
       });        
       dagreGraph.setEdge(unionNodeId, childId);
    }
  });

  // --- 4. Run Dagre Layout ---
  dagre.layout(dagreGraph);

  // --- 5. Apply Initial Node Positions ---
  let layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - (node.id.startsWith('union-') ? UNION_NODE_SIZE : NODE_WIDTH) / 2,
        y: nodeWithPosition.y - (node.id.startsWith('union-') ? UNION_NODE_SIZE : NODE_HEIGHT) / 2,
      },
    };
  });

  // --- 6. POST-PROCESSING: Center the Union Nodes ---
  // This override fixes the "skewed" look by manually moving the union node
  // to the exact midpoint of its parents.
  layoutedNodes = layoutedNodes.map((node) => {
    if (node.type === 'union' && node.data.parents && node.data.parents.length > 0) {
        // Find the parent nodes in our current list
        const parents = layoutedNodes.filter(n => node.data.parents.includes(n.id));
        
        if (parents.length > 0) {
            // Calculate average Center X of parents
            // (Pos.x is top-left, so we add width/2 to get the center)
            const avgX = parents.reduce((sum, p) => sum + (p.position.x + NODE_WIDTH / 2), 0) / parents.length;
            
            // Calculate the lowest Y point of the parents (in case they aren't perfectly aligned)
            const maxY = Math.max(...parents.map(p => p.position.y));

            return {
                ...node,
                position: {
                    // Set new X: Center of parents - half the union node size
                    x: avgX - (UNION_NODE_SIZE / 2),
                    // Set new Y: Below the parents (Parent Top + Height + small buffer)
                    // We use maxY to ensure it sits below the lowest parent
                    y: maxY + NODE_HEIGHT + 50 
                }
            };
        }
    }
    return node;
  });

  return { nodes: layoutedNodes, edges };
};