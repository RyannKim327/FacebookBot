class Graph {
    constructor(vertices) {
        this.V = vertices;
        this.graph = [];
    }

    addEdge(u, v, w) {
        this.graph.push({ u, v, w });
    }

    bellmanFord(source) {
        // Step 1: Initialize distances from source to all other vertices as Infinity
        let distances = new Array(this.V);
        for (let i = 0; i < this.V; ++i) {
            distances[i] = Infinity;
        }
        distances[source] = 0;

        // Step 2: Relax all edges |V| - 1 times
        for (let i = 0; i < this.V - 1; ++i) {
            for (let j = 0; j < this.graph.length; ++j) {
                let { u, v, w } = this.graph[j];
                if (distances[u] + w < distances[v]) {
                    distances[v] = distances[u] + w;
                }
            }
        }

        // Step 3: Check for negative-weight cycles
        for (let i = 0; i < this.graph.length; ++i) {
            let { u, v, w } = this.graph[i];
            if (distances[u] + w < distances[v]) {
                console.log("Graph contains negative weight cycle");
                return;
            }
        }

        // Step 4: Print the distances
        for (let i = 0; i < this.V; ++i) {
            console.log(`Vertex ${i} distance from source: ${distances[i]}`);
        }
    }
}

// Usage:
const graph = new Graph(5);
graph.addEdge(0, 1, -1);
graph.addEdge(0, 2, 4);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 2);
graph.addEdge(1, 4, 2);
graph.addEdge(3, 2, 5);
graph.addEdge(3, 1, 1);
graph.addEdge(4, 3, -3);
graph.bellmanFord(0);
Vertex 0 distance from source: 0
Vertex 1 distance from source: -1
Vertex 2 distance from source: 2
Vertex 3 distance from source: -2
Vertex 4 distance from source: 1
