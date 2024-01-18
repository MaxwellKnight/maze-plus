import { Coordinate, Maze } from '../../types/algorithms.types';
import { DIRECTIONS, isRange, OPPOSITE_DIRECTIONS, getCoordinateKey, DIRECTIONS_CORDS, updateWall } from '../../utils/algorithms.utils';

const { TOP, RIGHT, BOTTOM, LEFT } = DIRECTIONS;
const DEFAULT_WALL = "0000";

/**
 * Validate if the neighbor cell in the specified direction is within the maze boundaries and has not been visited.
 *
 * @param {Coordinate} direction - The direction to check for a neighbor.
 * @param {Coordinate} source - The source cell's coordinates.
 * @param {number} rows - The number of rows in the maze.
 * @param {number} columns - The number of columns in the maze.
 * @param {Set<string>} visited - The set of visited cell coordinates.
 * @returns {boolean} - True if the neighbor is valid; otherwise, false.
 */
const isNeighbor = (direction: Coordinate, source: Coordinate, rows: number, columns: number, visited: Set<string>) => (
	direction
	&& isRange(source.x + direction.x, source.y + direction.y, rows, columns)
	&& !visited.has(getCoordinateKey(direction.x + source.x, direction.y + source.y))
);

/**
 * Get all unvisited neighbors of the given cell coordinates.
 *
 * @param {Coordinate | undefined} source - The source cell coordinates.
 * @param {Set<string>} visited - The set of visited cell coordinates.
 * @param {number} rows - The number of rows in the maze.
 * @param {number} columns - The number of columns in the maze.
 * @returns {Coordinate[]} - An array of unvisited neighbor coordinates.
 */
const getNeighbors = (source: Coordinate | undefined, visited: Set<string>, rows: number, columns: number): Coordinate[] => {
	const unvisitedList = [];
	if (!source) return [];

	for (const direction of [TOP, RIGHT, BOTTOM, LEFT]) {
		const destination = DIRECTIONS_CORDS[direction];
		if (!destination) continue;

		const x = source.x + destination.x;
		const y = source.y + destination.y;
		if (isNeighbor(destination, source, rows, columns, visited))
			unvisitedList.push({ x, y, direction });
	}
	return unvisitedList;
};

/**
 * Generate a randomized maze using randomized Depth-First Search algorithm.
 *
 * @param {number} rows - The number of rows in the maze.
 * @param {number} columns - The number of columns in the maze.
 * @returns {[Maze, Coordinate[]]} - A tuple containing the generated maze and the trail of visited cells.
 */
const createMazeDFS = (rows: number, columns: number): [Maze, Coordinate[]] => {
	const stack: Coordinate[] = [], trail = [], visited = new Set<string>();
	const start: Coordinate = { x: 0, y: 0 };
	const maze: Maze = Array(rows).fill([]).map(() => Array(columns).fill(DEFAULT_WALL));

	stack.push(start);
	visited.add(getCoordinateKey(start.x, start.y));

	while (stack.length > 0) {
		const current = stack.pop();
		if (!current) continue;
		const { x: cX, y: cY } = current as Required<Coordinate>;

		const unvisitedList = getNeighbors(current, visited, rows, columns);
		trail.push(current);

		if (unvisitedList.length > 0) {
			stack.push(current);

			const destination = Math.floor(Math.random() * unvisitedList.length);
			const { x: dX, y: dY, direction: dstDirection } = unvisitedList[destination] as Required<Coordinate>;

			maze[cX][cY] = updateWall(maze[cX][cY], dstDirection);
			maze[dX][dY] = updateWall(maze[dX][dY], OPPOSITE_DIRECTIONS[dstDirection]);

			visited.add(getCoordinateKey(dX, dY));
			stack.push({ x: dX, y: dY });
		}
	}
	return [maze, trail];
};

export { createMazeDFS };
