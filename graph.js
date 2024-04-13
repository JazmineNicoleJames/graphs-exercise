class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);

  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let v of this.nodes){
      v.adjacent.delete(vertex)
    }
    this.nodes.delete(vertex)

  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visited = new Set();
    let value = [];

    function dfs(node) {
      if(!node || visited.has(node)) {
        return;
      }
      visited.add(node);
      value.push(node.value);
    
      for(let neighbor of node.adjacent){
        dfs(neighbor)
      }
    }
    dfs(start);
    return value;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set();
    let queue = [start]
    let value = [];
    while(queue.length > 0) {
      let currNode = queue.shift();
      if(!visited.has(currNode)) {
        visited.add(currNode);
        value.push(currNode.value);
        for(let neighbor of currNode.adjacent){
          if(!visited.has(neighbor)){
            queue.push(neighbor)
          }
        }
      }
    }
    return value;
  }
}

module.exports = {Graph, Node}