import { Coordinate, Maze } from "../../types/algorithms.types";
import { getDirection, updateWall } from "../../utils/algorithms.utils";

const DEFAULT_WALL = "0000";

export const createMazeKruskal = (rows: number, columns: number): [Maze, Coordinate[]] => {
	const maze: Maze = Array(rows).fill([]).map(() => Array(columns).fill(DEFAULT_WALL));
	const sets: number[] = Array(rows * columns).fill(0).map((_, index) => index);
	const edges: { source: Coordinate, destination: Coordinate }[] = [];

	// Helper function to find the representative element of a set
	const findSet = (index: number): number => {
		if (sets[index] !== index) 
			sets[index] = findSet(sets[index]); // Path compression
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
			if (x < rows - 1) edges.push({ source: { x, y }, destination: { x: x + 1, y } });
			if (y < columns - 1) edges.push({ source: { x, y }, destination: { x, y: y + 1 } });
		}
	}

	// Shuffle edges
	for (let i = edges.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[edges[i], edges[j]] = [edges[j], edges[i]];
	}

	// Kruskal's algorithm
	for (const edge of edges) {
		const { source, destination } = edge;
		const index1 = source.x * columns + source.y;
		const index2 = destination.x * columns + destination.y;

		if (findSet(index1) !== findSet(index2)) {
			maze[source.x][source.y] = updateWall(maze[source.x][source.y], getDirection(source, destination));
			maze[destination.x][destination.y] = updateWall(maze[destination.x][destination.y], getDirection(destination, source));
			unionSets(index1, index2);
		}
	}
	return [maze, []];
};
