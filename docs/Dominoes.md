

```
[Skip to content](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#main-content)

[![DEV Community](https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png)](https://dev.to/)

[Create account](https://dev.to/enter?signup_subforem=1&state=new-user)

014

[![Cover image for Solving the Dominoes problem with Graph Theory and Typescript](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fel0u1pq9a6ggzbtf9cx6.jpg)](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fel0u1pq9a6ggzbtf9cx6.jpg)

[![Kirk Shillingford](https://media2.dev.to/dynamic/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F64350%2F2873bc42-62f8-4aba-9950-3f24e8a56308.jpg)](https://dev.to/kirkcodes)

[Kirk Shillingford](https://dev.to/kirkcodes)

Posted on Apr 7, 2021•Edited on Apr 9, 2021

![](https://assets.dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg)28![](https://assets.dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg)3

# Solving the Dominoes problem with Graph Theory and Typescript

[#typescript](https://dev.to/t/typescript)[#exercism](https://dev.to/t/exercism)[#algorithms](https://dev.to/t/algorithms)[#graphtheory](https://dev.to/t/graphtheory)

## [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#prelude)Prelude

This is a very short article which talks about using graph theory to solve my latest code challenge.

Every two weeks my online community group, [Virtual Coffee](https://virtualcoffee.io/) picks a new challenge for us all to work on together.

This fortnight we've been working on the [Dominoes problem](https://exercism.io/tracks/javascript/exercises/dominoes) on [https://www.exercism.io](https://www.exercism.io/).

I tried to solve this [previously](https://dev.to/kirkcodes/solving-the-dominoes-exercism-problems-with-active-patterns-in-f-384d) using F# without having to do any recursion or traversals. That _basically_ worked, but failed at a few edge cases and ultimately wasn't a complete solution.

While looking at other implementations I stumbled upon [this solution](https://exercism.io/tracks/fsharp/exercises/dominoes/solutions/8d97e2a04a40484eae7cb0d6c30f515b) which proposed that you could solve the problem by modelling the dominoes as a [Graph](https://en.wikipedia.org/wiki/Graph_\(discrete_mathematics\)). I liked the approach conceptually, but didn't want to just recreate the answer in F# again so I figured I'd try it with Typescript.

If you just want see the code, feel free to skip to [here](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#fullsolution).

So without further ado, let's dive in.

## [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#introduction)INTRODUCTION

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#problem)Problem

Paraphrasing [exercism](https://www.exercism.io/), "Write a function `canChain` to determine whether a set of dominoes (an array of tuples) can be chained."

e.g. The dominoes

**(1, 2), (1, 3), (2, 3)**

can be chained together as

**(1, 2) (2, 3) (3, 1)**

where each domino is joined at matching number terminals.

Conversely the dominoes

**(1, 2), (1, 3), (4, 4)**

cannot be chained because there is no domino  
that can connect to **(4, 4)**.

Some extra rules:

- Empty arrays should return true
- The ends of the domino set should also match (making a perfect loop)

```


canChain([]) // true

canChain([1, 2]) // false

canChain([3, 3]) // true

canChain([[1, 2], [2, 3], [3, 4]]) // false

canChain([[1, 2], [1, 3], [4, 4]]) // false

canChain([[1, 2], [2, 3], [3, 1]]) // true


```

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#methodology)Methodology

We can model our set of dominoes as a graph where each domino represents two nodes (one for each number on the domino) and the edge/line/arrow that connects them.

When two dominoes have the same number, that means at least one of their nodes overlap and they can be chained.

For example, take the set of Dominoes

**(1, 4) (2, 4) (3, 4) (4, 5) (5, 6)**

We could model them as the following graph:

[![Tree graph](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fd%2Fda%2FTree_graph.png)](https://commons.wikimedia.org/wiki/File:Tree_graph.png "AxelBoldt at English Wikipedia, Public domain, via Wikimedia Commons")

By observation, we can see that while some of these can be chained, there's no way to get from say, node 1 (from our (1, 4) domino, though all the other nodes, and back to node 1). We don't have another '1' to pair it with.

Thus we can rephrase the problem of

_"Can the dominoes chain?"_

to the graph centric questions of

_"Do these nodes all connect?"_ and _"Can we get from any node to every other node and back to the start?"_

It turns out, in graph theory, this type of configuration requirement has a name: A Euler Graph.

[![Labelled Eulergraph](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F72%2FLabelled_Eulergraph.svg%2F256px-Labelled_Eulergraph.svg.png)](https://commons.wikimedia.org/wiki/File:Labelled_Eulergraph.svg "S Sepp, Public domain, via Wikimedia Commons")

A Euler graph is definied as a graph having a [Eulerian cycle](https://en.wikipedia.org/wiki/Eulerian_path), which is exactly what we just described:

> a Eulerian cycle is a path starting and ending on the same vertex) that visits each edge exactly once. - Wikipedia

This means that all we need to do to prove if our dominoes can chain is to prove that the graph those dominoes  
represent has a Euler cycle.

And THAT proof it turns out, also has a formal definition, known as **Euler's Theorem**:

> "A Connected graph has an Euler cycle if and only if every vertex has even degree".

So our solution now has two parts:

First, we check if the dominoes can be converted to a **Connected** graph, which we've already looked at.

Second, we check if every vertex (number) in our set of dominoes has an **even degree** (appears as a multiple of two).

[![A graph with central vertex having degree as number of vertices minus one and the remaining vertices with degree one](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F2e%2FA_graph_with_central_vertex_having_degree_as_number_of_vertices_minus_one_and_the_remaining_vertices_with_degree_one.PNG)](https://commons.wikimedia.org/wiki/File:A_graph_with_central_vertex_having_degree_as_number_of_vertices_minus_one_and_the_remaining_vertices_with_degree_one.PNG "Akshaya Mathew, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons")

Th graph above is an example of a graph that is connected (you can get from one node to any other node) but it's nodes don't have an even number of edges. Even without the numbers we know this graph cannot form a loop.

[![Cycle graph](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ffa%2FCycle_graph.png)](https://commons.wikimedia.org/wiki/File:Cycle_graph.png "Not me, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons")

This graph on the other hand has each node with an even number of edges joining it to other nodes, and thus can loop.

Now that we've explored some of the theory behind our proposed solution, let's see if we can enforce these concepts with Typescript.

## [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#implementation)Implementation

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#establishing-our-domain)Establishing our domain

Since it's Typescript, we'll start the way we always do by defining the types that establish the domain we're working with. We want to define what a Domino is (in this implementation) as well as some of the data structures related to Graph modelling.

```


type NodeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Domino = [NodeNumber, NodeNumber];

type EdgeSet = Domino[]; // A representation of the set of edges in a graph

type AdjacencyMatrix = MatrixValue[][]; // Representation of a graph as a matrix of filled/unfilled cells

type AdjacencyList = number[][]; // Representation as a list of connected nodes

type MatrixValue = "Filled" | "Empty";

type NodeStatus = "Visited" | "Not Visited";

type EulerCondition = (_: EdgeSet) => boolean; // Functions that test our Euler's theory


```

The three types above, `EdgeSet`, `AdjacencyMatrix`, and `AdjacencyList` represent three common ways of representing graphs. Our list of dominoes is passed into our code as an `EdgeSet`; a sequence representing pairs of connected nodes.

However to determine if we have a Eulerian cycle, we'll have to convert our `EdgeSet` to an `AdjacencyMatrix` and then convert that to an `AdjacencyList`.

So let's define some functions to do just that.

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#creating-our-conversion-functions)Creating our conversion functions

First we need to define two small helper functions

```


const id = (x: any) => x; // yes, this returns itself.

// simplifies an edgeset down to its unique nodes by converting to and from a set
const getNodes = (dominoes: EdgeSet): NodeNumber[] => [
  ...new Set(dominoes.flatMap(id))
];


```

Now we can define a function that converts an `EdgeSet` into the appropriate `AdjacencyMatrix`

[![Graph isomorphism](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F3c%2FGraph_isomorphism.svg%2F256px-Graph_isomorphism.svg.png)](https://commons.wikimedia.org/wiki/File:Graph_isomorphism.svg "Dcoetzee, Public domain, via Wikimedia Commons")

```


const toMatrix = (dominoes: EdgeSet) => {
  const nodes = getNodes(dominoes);
  const nodeToIndex = (digit: NodeNumber) =>
    nodes.findIndex((node) => node === digit);

  // initial graph of all false values
  const initMatrix: AdjacencyMatrix = Array.from(Array(nodes.length), () =>
    [...new Array(nodes.length)].map((_) => "Empty")
  );

  const addToMatrix = (graph: AdjacencyMatrix, domino: Domino) => {
    const [x, y] = domino;
    graph[nodeToIndex(x)]![nodeToIndex(y)] = "Filled";
    graph[nodeToIndex(y)]![nodeToIndex(x)] = "Filled";

    return graph;
  };

  return dominoes.reduce(addToMatrix, initMatrix);
};


```

and a function that turns an `AdjacencyMatrix` into an `AdjacencyList`

```


const toAdjacencyList = (graph: AdjacencyMatrix): AdjacencyList =>
  graph.map(
    (row) =>
      row
        .map((val, index): [number, MatrixValue] => [index, val]) // add indexes
        .filter(([_, val]) => val === "Empty") // filter unfilled cells
        .map(([index, _]) => index) // keep indexes
  );


```

We won't dive too deep into the code behind these functions except to say that what matters most to us is the `AdjacencyList`. An [Adjacent List](https://en.wikipedia.org/wiki/Adjacency_list) is a way of representing finite graphs where each node in the list contains the set of nodes adjacent to that node.

[![Dsa adj list](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff6%2FDsa_adj_list.png)](https://commons.wikimedia.org/wiki/File:Dsa_adj_list.png "Thedsadude, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons")

e.g. Earlier, we had the dominoes  
**(1, 2), (1, 3), (4, 4)**  
We said that we could represent these in typescript as the Edge set

```


[[1, 2], [1, 3], [4, 4]]


```

But we could also put them in the shape of the Adjacency list

```


[[2, 3], [1], [1], []]


```

In this representation, each item in the outer list represents a node, and each inner list is the the _adjacent_ nodes to that one.

So we can read this adjacency list as:

- Node 1 has nodes 2 and 3 adjacent to it
- Node 2 has node 1 adjacent to it
- Node 3 has node 1 adjacent to it
- Node 4 has no nodes adjacent to it

And this corresponds perfectly to what we see looking at the original dominoes.

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#implementing-our-search-function)Implementing our search function

[![Depth-First-Search](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F7f%2FDepth-First-Search.gif)](https://commons.wikimedia.org/wiki/File:Depth-First-Search.gif "Mre, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons")

Now that we have a data structure showing our nodes and who they're adjacent to, we need a function that actually checks to see whether we can get to every node from any one starting node.

There are a few options for what we can use to do this but here we'll be applying the [Depth-First Search](https://en.wikipedia.org/wiki/Depth-first_search#:~:text=Depth%2Dfirst%20search%20\(DFS\),along%20each%20branch%20before%20backtracking.), a well known algorithm for traversing tree/graph data structures.

_Depth-first_ means it will travel all the way to the end of a 'tree' from the root before backtracking (unlike its counterpart, _Breadth-first search_, which will check all paths on one level before going lower).

So our depth-first search (dfs) function will (recursively) go from node to adjacent nodes as defined in our Adjacency list. To help it, we'll make an array representing all the nodes available called `statuses`. Every time the dfs meets a node it hasn't encountered before it will update the array of node statuses.

**If the dfs visits all available nodes as it traverses through the adjacency list, then voila, that means the graph _must_ be connected.**

```


type DFS = (...args: [AdjacencyList, NodeStatus[], number]) => void;
const depthFirstSearch: DFS = (graph, statuses, node) => {
  statuses[node] = "Visited";

  graph[node]!.filter((adjacent) => statuses[adjacent] === "Not Visited") // get unvisited nodes
    .forEach((unvisitedNode) =>
      depthFirstSearch(graph, statuses, unvisitedNode)
    );
};


```

Note that this implementation of dfs doesnt return a value, it simply updates the array of node statuses. Then it checks to see if the current node has any adjacent nodes that haven't been visited, and recursively calls itself with those.

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#defining-our-euler-conditions)Defining our Euler Conditions

Now that we've defined our data structures and our search function, it's finally time to put it together and create the function that will actually check to see if our Eulerian cycle exist. Each one is designed to accept the original list of dominoes and return whether our conditions were satisfied or not.

First our `isConnected` function which uses the code we defined above to determine if the domino array representing the `EdgeSet` of a graph is a connected graph by checking if every node in the visited array .

```


const isConnected: EulerCondition = (dominoes) => {
  const nodes = getNodes(dominoes);
  const statuses: NodeStatus[] = [...new Array(nodes.length)].map(
    (_) => "Not Visited"
  );
  const graph = toAdjacencyList(toMatrix(dominoes));

  // time to spelunk
  depthFirstSearch(graph, statuses, 0);

  return statuses.every((x) => x === "Visited");
};


```

Next we make a function `allEvenDegree` to see if our edges all have an even number of representations. We do this by folding the array of dominoes into a Map (object) of keys representing our nodes, and values representing the amount of times they appear in the array.

```


const allEvenDegree: EulerCondition = (dominoes) => {
  const isEven = (n: number) => n % 2 === 0;

  // creates a map of nodes and the amount of times they appear
  const addToMap = (m: Map<NodeNumber, number>, node: NodeNumber) =>
    m.has(node) ? m.set(node, m.get(node)! + 1) : m.set(node, 1);

  const nodeCounts: number[] = [
    ...dominoes
      .flatMap(id) // concat + flatten
      .reduce(addToMap, new Map()) // fold into a map
      .values()
  ]; // back to array

  return nodeCounts.every(isEven);
};


```

### [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#putting-it-all-together)Putting it all together

Finally, after all that, all that remains is to define our `canChain` function that assembles all our logic into one conveniently exposed function. `canChain` checks to see if a set or dominoes has all even degree **and** (&&) is a connected graph.*

```


export const canChain: EulerCondition = (dominoes) =>
  dominoes.length === 0 || (allEvenDegree(dominoes) && isConnected(dominoes));


```

*If you remember, we said at the beginning that empty arrays should all evaluate to true, so we used an or (||) operation to stick that clause onto the rest of our `canChain` operation.

## [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#conclusion-and-resources)Conclusion and Resources

If you've made it this far, thank you for reading about my little exploration of graphs with Typescript. I just want to leave you with a few extra resources if this topic piqued your interests.

- [Here](https://github.com/tkshill/typescript_dominoes_exercism/blob/main/src/index.ts) is a link to full solution (with full notes)
- [This video](https://www.youtube.com/watch?v=LFKZLXVO-Dg&t=704s) does a good job in my opinion of explaining all the basic Graph Theory terminology we touched on here.
- And [this video](https://www.youtube.com/watch?v=52NDeYkVek0&t=608s) walks through using how to use an Adjacency list and depth-first search to find out if a graph is connected or not.

Please leave a comment if you have an questions, queries, concerns, qualms, or critiques.

Thank you for your time. :)

Here's the code in its entirety

## [](https://dev.to/kirkcodes/solving-the-dominoes-problem-with-graph-theory-and-typescript-45f2#full-solution)Full Solution

```


type NodeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Domino = [NodeNumber, NodeNumber];

type EdgeSet = Domino[]; // A representation of the set of edges in a graph

type AdjacencyMatrix = MatrixValue[][]; // Representation of a graph as a matrix of filled/unfilled cells

type AdjacencyList = number[][]; // Representation as a list of connected nodes

type MatrixValue = "Filled" | "Empty";

type NodeStatus = "Visited" | "Not Visited";

type EulerCondition = (_: EdgeSet) => boolean; // Functions that test our Euler's theory

// -------------------------- HELPER FUNCTIONS --------------------------

const id = (x: any) => x; // yes, this returns itself.

// simplifies an edgeset down to its unique nodes by converting to and from a set
const getNodes = (dominoes: EdgeSet): NodeNumber[] => [
  ...new Set(dominoes.flatMap(id))
];

// ------------------------- CONVERSION FUNCTIONS -------------------

const toMatrix = (dominoes: EdgeSet) => {
  const nodes = getNodes(dominoes);
  const nodeToIndex = (digit: NodeNumber) =>
    nodes.findIndex((node) => node === digit);

  // initial graph of all false values
  const initMatrix: AdjacencyMatrix = Array.from(Array(nodes.length), () =>
    [...new Array(nodes.length)].map((_) => "Empty")
  );

  const addToMatrix = (graph: AdjacencyMatrix, domino: Domino) => {
    const [x, y] = domino;
    graph[nodeToIndex(x)]![nodeToIndex(y)] = "Filled";
    graph[nodeToIndex(y)]![nodeToIndex(x)] = "Filled";

    return graph;
  };

  return dominoes.reduce(addToMatrix, initMatrix);
};

const toAdjacencyList = (graph: AdjacencyMatrix): AdjacencyList =>
  graph.map(
    (row) =>
      row
        .map((val, index): [number, MatrixValue] => [index, val]) // add indexes
        .filter(([_, val]) => val === "Empty") // filter unfilled cells
        .map(([index, _]) => index) // keep indexes
  );

/* --------------------- IMPLEMENTATION ---------------------------------

Our depthfirstsearch (dfs) function checks to see what nodes can be visited from other nodes.
It updates the visited array every time it gets to a new node.
If a graph is connected, dfs should visit every node.

*/
type DFS = (...args: [AdjacencyList, NodeStatus[], number]) => void;
const depthFirstSearch: DFS = (graph, statuses, node) => {
  statuses[node] = "Visited";

  graph[node]!.filter((adjacent) => statuses[adjacent] === "Not Visited") // get unvisited nodes
    .forEach((unvisitedNode) =>
      depthFirstSearch(graph, statuses, unvisitedNode)
    );
};

// determine if dominoes represent connected graph
const isConnected: EulerCondition = (dominoes) => {
  const nodes = getNodes(dominoes);
  const statuses: NodeStatus[] = [...new Array(nodes.length)].map(
    (_) => "Not Visited"
  );
  const graph = toAdjacencyList(toMatrix(dominoes));

  // time to spelunk
  depthFirstSearch(graph, statuses, 0);

  return statuses.every((x) => x === "Visited");
};

// check if every number in the dominoes has an even number of representations
const allEvenDegree: EulerCondition = (dominoes) => {
  const isEven = (n: number) => n % 2 === 0;

  // creates a map of nodes and the amount of times they appear
  const addToMap = (m: Map<NodeNumber, number>, node: NodeNumber) =>
    m.has(node) ? m.set(node, m.get(node)! + 1) : m.set(node, 1);

  const nodeCounts: number[] = [
    ...dominoes
      .flatMap(id) // concat + flatten
      .reduce(addToMap, new Map()) // fold into a map
      .values()
  ]; // back to array

  return nodeCounts.every(isEven);
};

// PUTTING IT ALL TOGETHER
export const canChain: EulerCondition = (dominoes) =>
  dominoes.length === 0 || (allEvenDegree(dominoes) && isConnected(dominoes));


```

[![Google Cloud](https://media.daily.dev/image/upload/s--eRXwiRwz--/f_auto/v1784479745/a/organization_logo_admin_1a461978-3a73-4e84-9593-382f949a1db2_1784479744996)

Google Cloud

](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMjY0MzhhNDItOWYzNi00NTAyLWIxMDAtYTZlZmViNjJhNDI2IiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjdkNjg3OGM5LTc5MjgtNDdjOS1hOWQ3LTQ4MDNjZDFhNjE1MCIsImEiOiI1YWI2ZjU3YS1iNWYxLTQ5YjgtYWU5MC0wYjNjZGQyZDNkY2MiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiMmMxN2E2NWYtMTA0NS00ZDUyLWIwOGYtYTMyYzE1MDY0YWMzIiwidGlkcyI6WyIyYzE3YTY1Zi0xMDQ1LTRkNTItYjA4Zi1hMzJjMTUwNjRhYzMiXSwiY3IiOiJjMzY1MzE2MC1kNDYxLTRkODktOTE5MC1mNGVmN2FiNzE3MjAiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.zG2TdioILnZMX9JYUjPMlLIY0MGpg71gg7o2YCDGRdk)Promoted

[![Fully Managed MySQL, PostgreSQL, and SQL Server](https://media.daily.dev/image/upload/s--_9MksbBM--/f_auto/v1784623164/a/1a668da6-f761-403f-a268-5503e8d2a8a7_1784623163986_banner)](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMjY0MzhhNDItOWYzNi00NTAyLWIxMDAtYTZlZmViNjJhNDI2IiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjdkNjg3OGM5LTc5MjgtNDdjOS1hOWQ3LTQ4MDNjZDFhNjE1MCIsImEiOiI1YWI2ZjU3YS1iNWYxLTQ5YjgtYWU5MC0wYjNjZGQyZDNkY2MiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiMmMxN2E2NWYtMTA0NS00ZDUyLWIwOGYtYTMyYzE1MDY0YWMzIiwidGlkcyI6WyIyYzE3YTY1Zi0xMDQ1LTRkNTItYjA4Zi1hMzJjMTUwNjRhYzMiXSwiY3IiOiJjMzY1MzE2MC1kNDYxLTRkODktOTE5MC1mNGVmN2FiNzE3MjAiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.zG2TdioILnZMX9JYUjPMlLIY0MGpg71gg7o2YCDGRdk)

## [Fully Managed MySQL, PostgreSQL, and SQL Server](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMjY0MzhhNDItOWYzNi00NTAyLWIxMDAtYTZlZmViNjJhNDI2IiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjdkNjg3OGM5LTc5MjgtNDdjOS1hOWQ3LTQ4MDNjZDFhNjE1MCIsImEiOiI1YWI2ZjU3YS1iNWYxLTQ5YjgtYWU5MC0wYjNjZGQyZDNkY2MiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiMmMxN2E2NWYtMTA0NS00ZDUyLWIwOGYtYTMyYzE1MDY0YWMzIiwidGlkcyI6WyIyYzE3YTY1Zi0xMDQ1LTRkNTItYjA4Zi1hMzJjMTUwNjRhYzMiXSwiY3IiOiJjMzY1MzE2MC1kNDYxLTRkODktOTE5MC1mNGVmN2FiNzE3MjAiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.zG2TdioILnZMX9JYUjPMlLIY0MGpg71gg7o2YCDGRdk)

Fully managed, cost-effective relational database service for PostgreSQL, MySQL, and SQL Server. Try Enterprise Plus edition for a 99.99% availability SLA and category-leading performance.

[Learn More →](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMjY0MzhhNDItOWYzNi00NTAyLWIxMDAtYTZlZmViNjJhNDI2IiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjdkNjg3OGM5LTc5MjgtNDdjOS1hOWQ3LTQ4MDNjZDFhNjE1MCIsImEiOiI1YWI2ZjU3YS1iNWYxLTQ5YjgtYWU5MC0wYjNjZGQyZDNkY2MiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiMmMxN2E2NWYtMTA0NS00ZDUyLWIwOGYtYTMyYzE1MDY0YWMzIiwidGlkcyI6WyIyYzE3YTY1Zi0xMDQ1LTRkNTItYjA4Zi1hMzJjMTUwNjRhYzMiXSwiY3IiOiJjMzY1MzE2MC1kNDYxLTRkODktOTE5MC1mNGVmN2FiNzE3MjAiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.zG2TdioILnZMX9JYUjPMlLIY0MGpg71gg7o2YCDGRdk)

## Top comments (0)

Subscribe

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

SubmitPreview

[Code of Conduct](https://dev.to/code-of-conduct) • [Report abuse](https://dev.to/report-abuse)

[![](https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F64350%2F2873bc42-62f8-4aba-9950-3f24e8a56308.jpg)Kirk Shillingford](https://dev.to/kirkcodes)

Follow

Full Stack Functional Programmer focused on Accessibility, Testing, and Documentation/Technical Writing. Trying to be less clever and more kind. He/Him

- Location
    
    Alberta, Canada
    
- Education
    
    B.E. in Environmental Engineering, CUNY
    
- Pronouns
    
    He/They
    
- Work
    
    Community Manager at Virtual Coffee
    
- Joined
    
    Mar 26, 2018
    

### More from [Kirk Shillingford](https://dev.to/kirkcodes)

[Scripting with VSCode Tasks and Typescript

#typescript #node #vscode #tutorial

](https://dev.to/kirkcodes/scripting-with-vscode-tasks-and-typescript-38h7)[Revealing Compound Types in Typescript

#typescript #programming #generic

](https://dev.to/kirkcodes/revealing-compound-types-in-typescript-2ic8)

[![Google Cloud](https://media.daily.dev/image/upload/s--eRXwiRwz--/f_auto/v1784479745/a/organization_logo_admin_1a461978-3a73-4e84-9593-382f949a1db2_1784479744996)

Google Cloud

](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMzFiMTJmN2UtNmE4MS00OGFhLTg3ZmYtZDZiMzk3NThmMTQwIiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjYyYmE4NWRmLThiZjgtNDM2ZS1iODQ2LTcwMGM0NzJmMDAzNiIsImEiOiJlOTdjY2I0NS00YzdjLTRhZTUtOGQ3Mi02ZTBkMjJlZWFiZjMiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiZjE4MzU1ZDMtOTNmNi00NGMzLTllNTMtY2RlMjA5NjE1YzI4IiwidGlkcyI6WyJmMTgzNTVkMy05M2Y2LTQ0YzMtOWU1My1jZGUyMDk2MTVjMjgiXSwiY3IiOiJkZmU5ZWMwOC0yMTAxLTQyNDQtOWRmMS1kMGU1MWRhNDQ1YjIiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.Ouemhk1iPauzlbR9GFoyKwf4wJuhnGsrTLcmz8VbnQc)Promoted

[![Save Up to 91% on Cloud Compute With Spot VMs](https://media.daily.dev/image/upload/s--35GKN2ty--/f_auto/v1784623102/a/1a668da6-f761-403f-a268-5503e8d2a8a7_1784623102491_banner)](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMzFiMTJmN2UtNmE4MS00OGFhLTg3ZmYtZDZiMzk3NThmMTQwIiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjYyYmE4NWRmLThiZjgtNDM2ZS1iODQ2LTcwMGM0NzJmMDAzNiIsImEiOiJlOTdjY2I0NS00YzdjLTRhZTUtOGQ3Mi02ZTBkMjJlZWFiZjMiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiZjE4MzU1ZDMtOTNmNi00NGMzLTllNTMtY2RlMjA5NjE1YzI4IiwidGlkcyI6WyJmMTgzNTVkMy05M2Y2LTQ0YzMtOWU1My1jZGUyMDk2MTVjMjgiXSwiY3IiOiJkZmU5ZWMwOC0yMTAxLTQyNDQtOWRmMS1kMGU1MWRhNDQ1YjIiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.Ouemhk1iPauzlbR9GFoyKwf4wJuhnGsrTLcmz8VbnQc)

## [Save Up to 91% on Cloud Compute With Spot VMs](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMzFiMTJmN2UtNmE4MS00OGFhLTg3ZmYtZDZiMzk3NThmMTQwIiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjYyYmE4NWRmLThiZjgtNDM2ZS1iODQ2LTcwMGM0NzJmMDAzNiIsImEiOiJlOTdjY2I0NS00YzdjLTRhZTUtOGQ3Mi02ZTBkMjJlZWFiZjMiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiZjE4MzU1ZDMtOTNmNi00NGMzLTllNTMtY2RlMjA5NjE1YzI4IiwidGlkcyI6WyJmMTgzNTVkMy05M2Y2LTQ0YzMtOWU1My1jZGUyMDk2MTVjMjgiXSwiY3IiOiJkZmU5ZWMwOC0yMTAxLTQyNDQtOWRmMS1kMGU1MWRhNDQ1YjIiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.Ouemhk1iPauzlbR9GFoyKwf4wJuhnGsrTLcmz8VbnQc)

Run VMs on high-performance and reliable cloud infrastructure. Choose from preset or custom machine types for web servers, databases, and applications that fuel your agents.

[Learn More →](https://adsapi.daily.dev/v1/publishers/c?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPYmplY3QiOnsiY3BjIjoiMCIsImVjIjoiMCIsImJtIjoib2xkbG9naWMiLCJpIjoiMzFiMTJmN2UtNmE4MS00OGFhLTg3ZmYtZDZiMzk3NThmMTQwIiwidSI6Imh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS91c2UtY2FzZXMvYXBwbGljYXRpb24tZGV2ZWxvcG1lbnQ_dXRtX3NvdXJjZT1EYWlseURldlx1MDAyNnV0bV9tZWRpdW09ZGlzcGxheVx1MDAyNnV0bV9jYW1wYWlnbj1DbG91ZC1TUy1EUi1HQ1AtMTcxMzY1OC1HQ1AtRFItTkEtVVMtZW4tRGFpbHlEZXYtRGlzcGxheS1EaXNwbGF5LUFsbC0lZXBpZCEtJWVjaWQhLVdlYkRldlx1MDAyNnV0bV9jb250ZW50PXtkZXZpY2V9LXthZGdyb3VwaWR9LXtuZXR3b3JrfS17dGFyZ2V0aWR9LXtsb2NfcGh5c2ljYWxfbXN9LXtjYW1wYWlnbmlkfSIsInBpZCI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZSIsImFpIjoiMWE2NjhkYTYtZjc2MS00MDNmLWEyNjgtNTUwM2U4ZDJhOGE3IiwiYyI6IjYyYmE4NWRmLThiZjgtNDM2ZS1iODQ2LTcwMGM0NzJmMDAzNiIsImEiOiJlOTdjY2I0NS00YzdjLTRhZTUtOGQ3Mi02ZTBkMjJlZWFiZjMiLCJwIjoiZGVmYXVsdF9jYXJkIiwidGlkIjoiZjE4MzU1ZDMtOTNmNi00NGMzLTllNTMtY2RlMjA5NjE1YzI4IiwidGlkcyI6WyJmMTgzNTVkMy05M2Y2LTQ0YzMtOWU1My1jZGUyMDk2MTVjMjgiXSwiY3IiOiJkZmU5ZWMwOC0yMTAxLTQyNDQtOWRmMS1kMGU1MWRhNDQ1YjIiLCJ1cyI6IjdkNzEzMzFmLTQ4M2EtNGRjZi1hOTAwLWVhYzI2MDdiNTEwZTphbm9uLWI4MmFkNGNmLTNiYTktNDVmMi1hMDc2LTQyYWVhN2ExNzIzMSIsInQiOjE3OTQyMTM4OTV9fQ.Ouemhk1iPauzlbR9GFoyKwf4wJuhnGsrTLcmz8VbnQc)

```


type NodeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Domino = [NodeNumber, NodeNumber];

type EdgeSet = Domino[]; // A representation of the set of edges in a graph

type AdjacencyMatrix = MatrixValue[][]; // Representation of a graph as a matrix of filled/unfilled cells

type AdjacencyList = number[][]; // Representation as a list of connected nodes

type MatrixValue = "Filled" | "Empty";

type NodeStatus = "Visited" | "Not Visited";

type EulerCondition = (_: EdgeSet) => boolean; // Functions that test our Euler's theory

// -------------------------- HELPER FUNCTIONS --------------------------

const id = (x: any) => x; // yes, this returns itself.

// simplifies an edgeset down to its unique nodes by converting to and from a set
const getNodes = (dominoes: EdgeSet): NodeNumber[] => [
  ...new Set(dominoes.flatMap(id))
];

// ------------------------- CONVERSION FUNCTIONS -------------------

const toMatrix = (dominoes: EdgeSet) => {
  const nodes = getNodes(dominoes);
  const nodeToIndex = (digit: NodeNumber) =>
    nodes.findIndex((node) => node === digit);

  // initial graph of all false values
  const initMatrix: AdjacencyMatrix = Array.from(Array(nodes.length), () =>
    [...new Array(nodes.length)].map((_) => "Empty")
  );

  const addToMatrix = (graph: AdjacencyMatrix, domino: Domino) => {
    const [x, y] = domino;
    graph[nodeToIndex(x)]![nodeToIndex(y)] = "Filled";
    graph[nodeToIndex(y)]![nodeToIndex(x)] = "Filled";

    return graph;
  };

  return dominoes.reduce(addToMatrix, initMatrix);
};

const toAdjacencyList = (graph: AdjacencyMatrix): AdjacencyList =>
  graph.map(
    (row) =>
      row
        .map((val, index): [number, MatrixValue] => [index, val]) // add indexes
        .filter(([_, val]) => val === "Empty") // filter unfilled cells
        .map(([index, _]) => index) // keep indexes
  );

/* --------------------- IMPLEMENTATION ---------------------------------

Our depthfirstsearch (dfs) function checks to see what nodes can be visited from other nodes.
It updates the visited array every time it gets to a new node.
If a graph is connected, dfs should visit every node.

*/
type DFS = (...args: [AdjacencyList, NodeStatus[], number]) => void;
const depthFirstSearch: DFS = (graph, statuses, node) => {
  statuses[node] = "Visited";

  graph[node]!.filter((adjacent) => statuses[adjacent] === "Not Visited") // get unvisited nodes
    .forEach((unvisitedNode) =>
      depthFirstSearch(graph, statuses, unvisitedNode)
    );
};

// determine if dominoes represent connected graph
const isConnected: EulerCondition = (dominoes) => {
  const nodes = getNodes(dominoes);
  const statuses: NodeStatus[] = [...new Array(nodes.length)].map(
    (_) => "Not Visited"
  );
  const graph = toAdjacencyList(toMatrix(dominoes));

  // time to spelunk
  depthFirstSearch(graph, statuses, 0);

  return statuses.every((x) => x === "Visited");
};

// check if every number in the dominoes has an even number of representations
const allEvenDegree: EulerCondition = (dominoes) => {
  const isEven = (n: number) => n % 2 === 0;

  // creates a map of nodes and the amount of times they appear
  const addToMap = (m: Map<NodeNumber, number>, node: NodeNumber) =>
    m.has(node) ? m.set(node, m.get(node)! + 1) : m.set(node, 1);

  const nodeCounts: number[] = [
    ...dominoes
      .flatMap(id) // concat + flatten
      .reduce(addToMap, new Map()) // fold into a map
      .values()
  ]; // back to array

  return nodeCounts.every(isEven);
};

// PUTTING IT ALL TOGETHER
export const canChain: EulerCondition = (dominoes) =>
  dominoes.length === 0 || (allEvenDegree(dominoes) && isConnected(dominoes));


```

[DEV Community](https://dev.to/) — A space to discuss and keep up software development and manage your software career

- [Home](https://dev.to/)
- [DEV Challenges](https://dev.to/challenges)
- [DEV++](https://dev.to/++)
- [Videos](https://dev.to/videos)
- [DEV Education Tracks](https://dev.to/deved)
- [DEV Help](https://dev.to/help)
- [Advertise on DEV](https://dev.to/advertise)
- [Organization Accounts](https://dev.to/organizations)
- [DEV Showcase](https://dev.to/showcase)
- [About](https://dev.to/about)
- [Contact](https://dev.to/contact)
- [Free Postgres Database](https://dev.to/free-postgres-database-tier)
- [DEV Shop](https://shop.forem.com/)
- [MLH](https://mlh.io/)

- [Code of Conduct](https://dev.to/code-of-conduct)
- [Privacy Policy](https://dev.to/privacy)
- [Terms of Use](https://dev.to/terms)

Built on [Forem](https://www.forem.com/) — the [open source](https://dev.to/t/opensource) software that powers [DEV](https://dev.to/) and other inclusive communities.

Made with love and [Ruby on Rails](https://dev.to/t/rails). DEV Community © 2016 - 2026.
```