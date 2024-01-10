# Maze Generator and Solver using DFS and BFS algorithms in TypeScript with React UI

This project is a maze-solving application built in React, leveraging TypeScript for improved type safety. The maze creation and solving algorithms include Depth-First Search (DFS) and Breadth-First Search (BFS). The codebase also incorporates utility functions `forEach` and `execute` to enhance asynchronous iteration and execution chaining, respectively.

If you want to mess around with it a little: [https://maxwellknight.github.io/maze-plus/](https://maxwellknight.github.io/maze-plus/)

## Table of Contents

- [Comparison: TypeScript vs. Plain JavaScript](#comparison-typescript-vs-plain-javascript)
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
- [Conclusion](#conclusion)
- [Screenshots](#screenshots)

## Comparison: TypeScript vs. Plain JavaScript

I refactored an existing JavaScript project into TypeScript, enhancing type safety and overall code quality. If anyone is interested in exploring the converted version, they can find the project [here](https://github.com/MaxwellKnight/maze-generator).

The transition from plain JavaScript to TypeScript in this maze-solving project brings tangible benefits in terms of type safety, development experience, code readability, and maintainability. TypeScript's static typing and advanced tooling contribute to a more robust and developer-friendly codebase. With improved documentation and better support for refactoring, TypeScript proves to be a valuable choice for enhancing the overall quality

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MaxwellKnight/maze-plus.git

   ```

2. Navigate to the project directory:

   ```bash
   cd maze-plus

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Run the project:

   ```bash
   npm run dev

   ```

The application will be accessible at http://localhost:5173.

## Maze Algorithms

### Depth-First Search (DFS)

The DFS algorithm is employed to generate a maze. It explores as far as possible along each branch before backtracking, creating intricate and winding paths.

### Breadth-First Search (BFS)

BFS is utilized for finding the shortest path in the generated maze. It explores all the vertices at the current depth before moving on to the vertices at the next depth, guaranteeing the shortest path is discovered.

## Utility Functions

### `forEach`

Enables asynchronous array iteration with a callback and delays.

Signature:

```bash
forEach(array: T[], callback: ForEachCallback<T>, delay?: number, offset?: number): Promise<void>

```

### Features:

Promise for completion.
setTimeout for optional initial delay (offset).
Asynchronous iteration with error handling.

### `execute`

Creates an organized chain of asynchronous functions with delays.

Signature:

```bash
execute(initialDelay: number = 0): ExecuteAPI
```

Methods:

```bash
#!Add a function to the execution chain with an optional delay.
add(fn: Function, delay?: number): ExecuteAPI

#!Set the delay for subsequent functions in the chain.
delay(delay: number): ExecuteAPI

#!Start the execution of the function chain.
start(): Promise<void>
```

Queue Management:

Sequential function execution with specified delays.

## Project Structure

The project structure is organized as follows:

- **src/components:** Contains React components, including the `Board` and `Cell` components.
- **src/algorithms:** Houses the DFS and BFS maze generation and solving algorithms.
- **src/utils:** Contains utility functions `execute` and `forEach` for managing asynchronous tasks and iteration.
- **src/styles:** Includes stylesheets for the application.

## Conclusion

This project is a maze-solving application built with Vite, utilizing TypeScript for enhanced type safety. The maze creation and solving algorithms include Depth-First Search (DFS) and Breadth-First Search (BFS). TypeScript is favored for its benefits in code readability, maintainability, and development experience. The project also integrates utility functions, forEach and execute, for improved asynchronous iteration and execution chaining.

## Screenshots

### Creating the maze (DFS)

![Alt text](/creating-maze.png?raw=true "Screenshot of the process of creating the maze")

### Searching for shortest path (BFS, between (0,0) -> (row - 1, column - 1))

![Alt text](/searching.png?raw=true "Screenshot of the BFS algorithm at work finding the shortest path")

### Displaying the shortest path

![Alt text](/shortest-path.png?raw=true "Screenshot of the shortest path in the maze")
