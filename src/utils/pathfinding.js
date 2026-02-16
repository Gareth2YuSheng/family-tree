// 1. Convert your complex data into a simple Neighbor Map
export const buildAdjacencyGraph = (nodes, edges) => {
  const adjacencyList = new Map();

  // Helper to add undirected connection
  const addEdge = (node1, node2) => {
    if (!adjacencyList.has(node1)) adjacencyList.set(node1, []);
    if (!adjacencyList.has(node2)) adjacencyList.set(node2, []);
    
    // Check duplicates
    if (!adjacencyList.get(node1).includes(node2)) adjacencyList.get(node1).push(node2);
    if (!adjacencyList.get(node2).includes(node1)) adjacencyList.get(node2).push(node1);
  };

  edges.forEach(edge => {
    // Treat every arrow as a two-way street
    addEdge(edge.source, edge.target);
  });

  return adjacencyList;
};

// BFS
export const findRelationshipPath = (graph, startNodeId, endNodeId) => {
  if (startNodeId === endNodeId) return [startNodeId];

  const queue = [[startNodeId]]; // Queue of paths
  const visited = new Set([startNodeId]);

  while (queue.length > 0) {
    const path = queue.shift(); // Get the next path to explore
    const currentNode = path[path.length - 1]; // Node we are currently at

    const neighbors = graph.get(currentNode) || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];
        
        // FOUND IT!
        if (neighbor === endNodeId) {
          return newPath;
        }

        visited.add(neighbor);
        queue.push(newPath);
      }
    }
  }

  return null; // No relationship found
};