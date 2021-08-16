import Dictionary from "../8map/map.js";
import Queue from "../5queue/queue.js";
import Stack from "../4stack/stack.js";


const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};

const initializeColor = vertices => {
    const color = {};
    for(let i = 0; i< vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
}

export class Graph {
    constructor(isDirected = false) {
        this.idDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    addVertex(v) {
        if(!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }

    addEdge(v, w) {
        if(!this.adjList.get(v)) {
            this.addVertex(v);
        }
        if(!this.adjList.get(w)) {
            this.addVertex(w);
        }
        this.adjList.get(v).push(w);
        if(!this.idDirected) {
            this.adjList.get(w).push(v);
        }
    }
    getVertices() { 
        return this.vertices; 
    } 

    getAdjList() { 
        return this.adjList; 
    }
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
          s += `${this.vertices[i]} -> `;
          const neighbors = this.adjList.get(this.vertices[i]);
          for (let j = 0; j < neighbors.length; j++) {
            s += `${neighbors[j]} `;
          }
          s += '\n';
        }
        return s;
      }
}

let graph = new Graph(); 
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // {12}
for (let i = 0; i < myVertices.length; i++) { // {13} 
    graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'B'); // {14}
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('C', 'D'); 
graph.addEdge('C', 'G'); 
graph.addEdge('D', 'G'); 
graph.addEdge('D', 'H'); 
graph.addEdge('B', 'E'); 
graph.addEdge('B', 'F'); 
graph.addEdge('E', 'I');
// console.log(graph);

// 广度优先算法
export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    queue.enqueue(startVertex);

    while(!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for(let i = 0; i< neighbors.length; i++) {
            const w = neighbors[i];
            if(color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK;
        // if(callback) {
        //     callback(u);
        // }
    }
}

const printVertex = (value) => console.log('Visited vertex: ' + value); // {15} 
// 调用
breadthFirstSearch(graph, myVertices[0], printVertex);


// 优化版广度优先
const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {};
    const predecessors = {};
    queue.enqueue(startVertex);

    for(let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0;
        predecessors[vertices[i]] = null;
    }

    while(!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);

        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if(color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1;
                predecessors[w] = u;
                queue.enqueue(w);
            }
        }

        color[u] = Colors.BLACK;
    }

    return {
        distances, predecessors
    }
}

const shortestPathA = BFS(graph, myVertices[0]);
// console.log(shortestPathA);

const fromVertex = myVertices[0];
//实例展示
for(let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i];
    const path = new Stack();
    for(let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        // console.log(v)
        path.push(v);
    }

    path.push(fromVertex);
    let s = path.pop();
    while(!path.isEmpty()) {
        s += "-" + path.pop();
    }

    // console.log(s);
}

// 深度优先
const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);

    for(let i = 0; i< vertices.length; i++) {
        if(color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisit(vertices[i], color, adjList, callback);
        }
    }
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY;
    // if(callback) {
    //     callback(u)
    // }

    const neighbors = adjList.get(u);
    for(let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if(color[w] === Colors.WHITE) {
            depthFirstSearchVisit(w, color, adjList, callback);
        }
    }
    color[u] = Colors.BLACK;
}

depthFirstSearch(graph, printVertex);


//优化版深度优先
export const DFS = graph => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const d = {};
    const f = {};
    const p = {};
    const time = {count: 0};

    for(let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }

    for(let i = 0; i < vertices.length; i++) {
        if(color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p , time, adjList);
        }
    }

    return {
        discovery: d,
        finished: f,
        predecessors: p
    }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY;
    d[u] = ++time.count;
    const neighbors = adjList.get(u);
    for(let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if(color[w] === Colors.WHITE){
            p[w] = u;
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    color[u] = Colors.BLACK;
    f[u] = ++time.count;
}

const shortestPathB = DFS(graph);
// console.log(shortestPathB)


graph = new Graph(true); // 有向图
myVertices = ['A', 'B', 'C', 'D', 'E', 'F']; 
for (let i = 0; i < myVertices.length; i++) { 
    graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('B', 'D'); 
graph.addEdge('B', 'E'); 
graph.addEdge('C', 'F'); 
graph.addEdge('F', 'E'); 
const result = DFS(graph);
const fTimes = result.finished;
let s = "";
for(let count = 0; count < myVertices.length; count++) {
    let max = 0;
    let maxName = null;
    for(let i = 0;i < myVertices.length; i++) {
        if(fTimes[myVertices[i]] > max) {
            max = fTimes[myVertices[i]];
            maxName = myVertices[i];
        }
    }
    s += "-" + maxName;
    delete fTimes[maxName];
}
console.log(s)