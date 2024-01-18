import { Coordinate, Maze } from "../../types/algorithms.types";
import { getCoordinateKey, getNeighbors } from "../../utils/algorithms.utils";

type A_Coordinate = Required<Omit<Coordinate, "direction">>;

/**
 * Calculate the heuristic (estimated cost) from a coordinate to the destination.
 *
 * @param {Coordinate} coordinate - The current coordinate.
 * @param {Coordinate} destination - The destination coordinate.
 * @returns {number} - The heuristic value.
 */
const calculateHeuristic = (coordinate: Coordinate, destination: Coordinate): number =>
	//Manhattan distance.
	Math.abs(coordinate.x - destination.x) + Math.abs(coordinate.y - destination.y);


/**
 * Find the shortest path using A* (A-star) algorithm.
 *
 * @param {{ source: Coordinate, destination: Coordinate }} path - Object containing source and destination coordinates.
 * @param {Maze} maze - 2D array of strings representing the maze.
 * @returns {[Coordinate[], Coordinate[]] | null} - If a shortest path exists, returns a tuple containing the shortest path (index 0) 
 * 																and the trail of visited cells (index 1); otherwise, returns null.
 */
export const astar_shortest_path = ({ source, destination }: { 
	source: Coordinate, 
	destination: Coordinate 
}, maze: Maze): [Coordinate[], Coordinate[]] | null => {

	const openSet: A_Coordinate[] = [], closedSet: Set<string> = new Set<string>();
	const start = { x: source.x, y: source.y, path: [], distance: 0, heuristic: 0 };
	const ROWS = maze.length, COLUMNS = maze[0].length;
	let shortest: Coordinate[] = [];

	openSet.push(start);

	while (openSet.length > 0) {
		openSet.sort((a, b) => (a.distance + a.heuristic) - (b.distance + b.heuristic));
		const current: A_Coordinate | undefined = openSet.shift();
		if (!current) continue;

		closedSet.add(getCoordinateKey(current.x, current.y));

		if (current.x === destination.x && current.y === destination.y) {
			shortest = [...(current.path || []), current];
			return [shortest, current.path || []];
		}

		const neighbors: Coordinate[] = getNeighbors(current, ROWS, COLUMNS, maze, new Set<string>(closedSet));
		for (let neighbor of neighbors) {
			const newPath = [...(current.path || []), current];
			const distance = current.distance + 1;
			const heuristic = calculateHeuristic(neighbor, destination);
			const newNeighbor = { ...neighbor, path: newPath, distance, heuristic };

			if (closedSet.has(getCoordinateKey(newNeighbor.x, newNeighbor.y))) continue;

			const existingOpenSetIndex = openSet.findIndex((node) => node.x === newNeighbor.x && node.y === newNeighbor.y);

			if (existingOpenSetIndex !== -1 && openSet[existingOpenSetIndex].distance + openSet[existingOpenSetIndex].heuristic <= newNeighbor.distance + newNeighbor.heuristic) continue;

			if (existingOpenSetIndex !== -1) {
				openSet.splice(existingOpenSetIndex, 1);
			}

			openSet.push(newNeighbor);
		}
	}

	return null;
}
