import { Coordinate, Maze } from "../../types/algorithms.types";
import { getCoordinateKey, getNeighbors } from "../../utils/algorithms.utils";

/**
 * Find the shortest path using Breadth-First Search (BFS) algorithm.
 *
 * @param {{ source: Coordinate, destination: Coordinate }} path - Object containing source and destination coordinates.
 * @param {Maze} maze - 2D array of strings representing the maze.
 * @returns {[Coordinate[], Coordinate[]] | null} - If a shortest path exists, returns a tuple containing the shortest path (index 0) 
 * 																and the trail of visited cells (index 1); otherwise, returns null.
 */
const bfs_shortest_path = ({ source, destination }: { 
	source: Coordinate, 
	destination: Coordinate 
}, maze: Maze): [Coordinate[], Coordinate[]] | null => {

	const queue: Coordinate[] = [], trail = [], visited = new Set<string>();
	const start = { x: source.x, y: source.y, path: [], distance: 0 };
	const ROWS = maze.length, COLUMNS = maze[0].length;
	let shortest: Coordinate[] = [];

	queue.push(start);

	while (queue.length > 0) {
		const current: Coordinate | undefined = queue.shift();
		if (!current) continue;

		trail.push(current);
		const { path, distance } = current;
		const currentKey = getCoordinateKey(current.x, current.y);

		if (visited.has(currentKey)) continue;
		visited.add(currentKey);

		if (current.x === destination.x && current.y === destination.y) {
			shortest = [...(path || []), current];
			return [shortest, trail];
		}

		const neighbors: Coordinate[] = getNeighbors(current, ROWS, COLUMNS, maze, visited);
		for (let neighbor of neighbors) {
			const newNeighbor = { ...neighbor, path: [...(path || []), current], distance: distance ? distance + 1 : 0 };
			queue.push(newNeighbor);
		}
	}
	return null;
}

export { bfs_shortest_path };
