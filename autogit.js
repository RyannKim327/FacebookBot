// Initialize the start and end points
const start = {
  x: 0,
  y: 0
};
const end = {
  x: 10,
  y: 10
};

// Initialize the open sets for both directions
const openSetForward = [start];
const openSetBackward = [end];

// Initialize the closed sets for both directions
const closedSetForward = [];
const closedSetBackward = [];

// Initialize the cameFrom objects for both directions
const cameFromForward = {};
cameFromForward[`${start.x},${start.y}`] = null;
const cameFromBackward = {};
cameFromBackward[`${end.x},${end.y}`] = null;

// Function to check if a node is in a set
const inSet = (set, node) => {
  for (const item of set) {
    if (item.x === node.x && item.y === node.y) {
      return true;
    }
  }
  return false;
};

// Function to get the neighbors of a node
const getNeighbors = (node) => {
  const neighbors = [];
  // Add the four adjacent nodes (up, down, left, right)
  neighbors.push({ x: node.x, y: node.y - 1 });
  neighbors.push({ x: node.x, y: node.y + 1 });
  neighbors.push({ x: node.x - 1, y: node.y });
  neighbors.push({ x: node.x + 1, y: node.y });
  return neighbors;
};

// Function to calculate the heuristic cost (Manhattan distance)
const heuristicCost = (node1, node2) => {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
};

// Main bi-directional search function
while (openSetForward.length > 0 && openSetBackward.length > 0) {
  // Get the node with the lowest fScore from both open sets
  const currentForward = openSetForward.sort((a, b) => a.fScore - b.fScore)[0];
  const currentBackward = openSetBackward.sort((a, b) => a.fScore - b.fScore)[0];

  // Check if the two current nodes have met
  if (`${currentForward.x},${currentForward.y}` === `${currentBackward.x},${currentBackward.y}`) {
    // The paths have met, reconstruct the path and return it
    return reconstructPath(cameFromForward, cameFromBackward, currentForward, currentBackward);
  }

  // Remove the current nodes from their respective open sets and add them to the closed sets
  openSetForward = openSetForward.filter((node) => node !== currentForward);
  openSetBackward = openSetBackward.filter((node) => node !== currentBackward);
  closedSetForward.push(currentForward);
  closedSetBackward.push(currentBackward);

  // Expand the current nodes and add their neighbors to the open sets
  const neighborsForward = getNeighbors(currentForward);
  const neighborsBackward = getNeighbors(currentBackward);
  for (const neighbor of neighborsForward) {
    // Skip if the neighbor is in the closed set or has an obstacle
    if (inSet(closedSetForward, neighbor) || inSet(closedSetBackward, neighbor)) {
      continue;
    }
    // Calculate the tentative gScore and fScore
    const tentativeGScore = currentForward.gScore + 1;
    const tentativeFScore = tentativeGScore + heuristicCost(neighbor, end);
    // Check if the neighbor is already in the open set
    let inOpenSet = false;
    for (const node of openSetForward) {
      if (node.x === neighbor.x && node.y === neighbor.y) {
        inOpenSet = true;
        // If the neighbor is already in the open set, update its gScore and fScore if the new values are lower
        if (tentativeGScore < node.gScore) {
          node.gScore = tentativeGScore;
          node.fScore = tentativeFScore;
          cameFromForward[`${neighbor.x},${neighbor.y}`] = currentForward;
        }
        break;
      }
    }
    // If the neighbor is not in the open set, add it to the open set
    if (!inOpenSet) {
      neighbor.gScore = tentativeGScore;
      neighbor.fScore = tentativeFScore;
      cameFromForward[`${neighbor.x},${neighbor.y}`] = currentForward;
      openSetForward.push(neighbor);
    }
  }
  for (const neighbor of neighborsBackward) {
    // Skip if the neighbor is in the closed set or has an obstacle
    if (inSet(closedSetBackward, neighbor) || inSet(closedSetForward, neighbor)) {
      continue;
    }
    // Calculate the tentative gScore and fScore
    const tentativeGScore = currentBackward.gScore + 1;
    const tentativeFScore = tentativeGScore + heuristicCost(neighbor, start);
    // Check if the neighbor is already in the open set
    let inOpenSet = false;
    for (const node of openSetBackward) {
      if (node.x === neighbor.x && node.y === neighbor.y) {
        inOpenSet = true;
        // If the neighbor is already in the open set, update its gScore and fScore if the new values are lower
        if (tentativeGScore < node.gScore) {
          node.gScore = tentativeGScore;
          node.fScore = tentativeFScore;
          cameFromBackward[`${neighbor.x},${neighbor.y}`] = currentBackward;
        }
        break;
      }
    }
    // If the neighbor is not in the open set, add it to the open set
    if (!inOpenSet) {
      neighbor.gScore = tentativeGScore;
      neighbor.fScore = tentativeFScore;
      cameFromBackward[`${neighbor.x},${neighbor.y}`] = currentBackward;
      openSetBackward.push(neighbor);
    }
  }
}

// If the paths did not meet, return null
return null;

// Function to reconstruct the path from the cameFrom objects
function reconstructPath(cameFromForward, cameFromBackward, currentForward, currentBackward) {
  // Reconstruct the path from the start node to the meeting point
  const pathForward = [];
  let currentNode = currentForward;
  while (currentNode !== null) {
    pathForward.unshift(currentNode);
    currentNode = cameFromForward[`${currentNode.x},${currentNode.y}`];
  }
  // Reconstruct the path from the meeting point to the end node
  const pathBackward = [];
  currentNode = currentBackward;
  while (currentNode !== null) {
    pathBackward.unshift(currentNode);
    currentNode = cameFromBackward[`${currentNode.x},${currentNode.y}`];
  }
  // Combine the two paths and return it
  return pathForward.concat(pathBackward);
}
