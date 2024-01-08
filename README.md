# Maze Generator and Solver using DFS and BFS algorithms in JavaScript with React UI

This project is a maze-solving application built with Vite, leveraging TypeScript for improved type safety. The maze creation and solving algorithms include Depth-First Search (DFS) and Breadth-First Search (BFS). The codebase also incorporates utility functions `forEach` and `execute` to enhance asynchronous iteration and execution chaining, respectively.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Maze Algorithms](#maze-algorithms)
- [Depth-First Search (DFS)](#depth-first-search-dfs)
- [Breadth-First Search (BFS)](#breadth-first-search-bfs)
- [Utility Functions](#utility-functions)
- [forEach](#foreach)
- [execute](#execute)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Comparison: TypeScript vs. Plain JavaScript](#comparison-typescript-vs-plain-javascript)
- [Conclusion](#conclusion)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MaxwellKnight/maze-plus.git``

   ```

2. Navigate to the project directory:

   ```bash
   cd maze-solver-project``

   ```

3. Install dependencies:

   ```bash
   `npm install``

   ```

4. Run the project:

   ````bash
   `npm run dev```

   ````

The application will be accessible at http://localhost:3000.

## Maze Algorithms

### Depth-First Search (DFS)

The DFS algorithm is employed to generate a maze. It explores as far as possible along each branch before backtracking, creating intricate and winding paths.

### Breadth-First Search (BFS)

BFS is utilized for finding the shortest path in the generated maze. It explores all the vertices at the current depth before moving on to the vertices at the next depth, guaranteeing the shortest path is discovered.

## Utility Functions

### `forEach`

The `forEach` function facilitates asynchronous iteration through an array, applying a callback function on each element with specified delays. This utility is useful for creating animations or step-by-step processes.

**Explanation:**

1.  **Type Definitions:**

    - `ForEachCallback<T>` defines the callback function type, taking an element of type `T`, its index, and the array.

2.  **Function Signature:**

    - `forEach` is a generic function that takes an array, a callback function, an optional delay, and an optional offset.

3.  **Promise Wrapper:**

    - The function returns a `Promise` that resolves when the entire iteration is complete.

4.  **Timeouts for Delay and Offset:**

    - `setTimeout` is used to introduce an optional initial delay (`offset`) before starting the iteration.

5.  **Asynchronous Iteration:**

    - The `iterate` function handles the asynchronous iteration through the array.

6.  **Try-Catch Block:**

    - A try-catch block is used to handle errors during the asynchronous iteration.

7.  **Inner Promise for Delay:**

    - An inner `Promise` with a timeout is used to introduce a delay before each iteration.

8.  **Callback Execution:**

    - The provided callback is executed with the current element, index, and array.

9.  **Resolve Outer Promise:**

    - The outer `Promise` is resolved to signal the completion of the entire iteration.

### `execute`

The `execute` function creates a chain of asynchronous functions with customizable delays between them. It provides a structured approach to asynchronous execution, enhancing readability and organization.

**Explanation:**

1.  **Type Definition:**

    - `ExecuteAPI` defines the API structure for the `execute` function, including methods `add`, `delay`, and `start`.

2.  **Function Signature:**

    - `execute` is a function that takes an optional `initialDelay` and returns an execution API.

3.  **State Variables:**

    - `queue` and `currentDelay` are state variables to manage the execution chain and track delays.

4.  **Add Function:**

    - `add` method adds a function to the execution chain with an optional delay. It returns the API for method chaining.

5.  **Wrapped Function:**

    - The added function is wrapped to ensure proper error handling and asynchronous execution.

6.  **Delay Function:**

    - `delay` method sets the delay for subsequent functions in the chain.

7.  **Start Function:**

    - `start` initiates the execution of the function chain, introducing delays between functions.

8.  **Queue Management:**

    - The `queue` ensures a sequential execution of functions with the specified delays.

9.  **API Object:**

    - The `api` object includes methods for adding functions, setting delays, and starting the execution.

## Project Structure

The project structure is organized as follows:

- **src/components:** Contains React components, including the `Board` and `Cell` components.
- **src/algorithms:** Houses the DFS and BFS maze generation and solving algorithms.
- **src/animation:** Contains utility functions `execute` and `forEach` for managing asynchronous tasks and iteration.
- **src/styles:** Includes stylesheets for the application.

## Screenshots

### Creating the maze (DFS)

![Alt text](/creating-maze.png?raw=true "Screenshot of the process of creating the maze")

### Searching for shortest path (BFS, between (0,0) -> (row - 1, column - 1))

![Alt text](/searching.png?raw=true "Screenshot of the BFS algorithm at work finding the shortest path")

### Displaying the shortest path

![Alt text](/shortest-path.png?raw=true "Screenshot of the shortest path in the maze")

## Comparison: TypeScript vs. Plain JavaScript

The transition from plain JavaScript to TypeScript in this maze-solving project brings tangible benefits in terms of type safety, development experience, code readability, and maintainability. TypeScript's static typing and advanced tooling contribute to a more robust and developer-friendly codebase. With improved documentation and better support for refactoring, TypeScript proves to be a valuable choice for enhancing the overall quality
