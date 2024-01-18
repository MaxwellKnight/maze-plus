import { Coordinate, Maze } from "../types/algorithms.types";
import { DIRECTIONS, updateWall } from "../utils/algorithms.utils";

const DEFAULT_WALL = "0000";
const { TOP, RIGHT, BOTTOM, LEFT } = DIRECTIONS;

const getDirection = (from: Coordinate, to: Coordinate): number => {
	const dx = to.x - from.x;
	const dy = to.y - from.y;

	if (dx === 0 && dy === -1) {
		 return TOP;
	} else if (dx === 0 && dy === 1) {
		 return BOTTOM;
	} else if (dx === -1 && dy === 0) {
		 return LEFT;
	} else if (dx === 1 && dy === 0) {
		 return RIGHT;
	}

	throw new Error("Invalid coordinates: cells must be neighbors.");
};

export const createMazeKruskal = (rows: number, columns: number): [Maze, Coordinate[]] => {
	const maze: Maze = Array(rows).fill([]).map(() => Array(columns).fill(DEFAULT_WALL));
	const sets: number[] = Array(rows * columns).fill(0).map((_, index) => index);
	const edges: { cell1: Coordinate, cell2: Coordinate }[] = [];

	// Helper function to find the representative element of a set
	const findSet = (index: number): number => {
		 if (sets[index] !== index) {
			  sets[index] = findSet(sets[index]); // Path compression
		 }
		 return sets[index];
	};

	// Helper function to join two sets
	const unionSets = (index1: number, index2: number): void => {
		 const root1 = findSet(index1);
		 const root2 = findSet(index2);
		 sets[root1] = root2;
	};

	// Populate edges
	for (let x = 0; x < rows; x++) {
		 for (let y = 0; y < columns; y++) {
			  if (x < rows - 1) {
					edges.push({ cell1: { x, y }, cell2: { x: x + 1, y } });
			  }
			  if (y < columns - 1) {
					edges.push({ cell1: { x, y }, cell2: { x, y: y + 1 } });
			  }
		 }
	}

	// Shuffle edges
	for (let i = edges.length - 1; i > 0; i--) {
		 const j = Math.floor(Math.random() * (i + 1));
		 [edges[i], edges[j]] = [edges[j], edges[i]];
	}

	// Kruskal's algorithm
	for (const edge of edges) {
		 const { cell1, cell2 } = edge;
		 const index1 = cell1.x * columns + cell1.y;
		 const index2 = cell2.x * columns + cell2.y;

		 if (findSet(index1) !== findSet(index2)) {
			  maze[cell1.x][cell1.y] = updateWall(maze[cell1.x][cell1.y], getDirection(cell1, cell2));
			  maze[cell2.x][cell2.y] = updateWall(maze[cell2.x][cell2.y], getDirection(cell2, cell1));
			  unionSets(index1, index2);
		 }
	}

	return [maze, []];
};
