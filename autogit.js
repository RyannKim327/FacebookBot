const Graph = require('graphlib').Graph;
const graph = new Graph();
graph.setNode('A');
graph.setNode('B');
graph.setNode('C');
graph.setNode('D');
graph.setEdge('A', 'B');
graph.setEdge('B', 'C');
graph.setEdge('C', 'D');
graph.setEdge('D', 'A');
const stack = [];
const components = new Set();
const visited = new Set();

function dfs(vertex) {
  visited.add(vertex);
  stack.push(vertex);

  for (let neighbor of graph.neighbors(vertex)) {
    if (!visited.has(neighbor)) {
      dfs(neighbor);
    }
  }

  if (stack[stack.length - 1] === vertex) {
    const component = [];

    while (stack.length > 0) {
      const v = stack.pop();
      component.push(v);

      if (v === vertex) {
        break;
      }
    }

    components.add(component);
  }
}

for (let vertex of graph.nodes()) {
  if (!visited.has(vertex)) {
    dfs(vertex);
  }
}
console.log(components);
Set([ [ 'A', 'B', 'C', 'D' ] ])
