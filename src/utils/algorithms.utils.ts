import { Coordinate, Directions, Maze } from "../types/algorithms.types";

// Constants for representing directions
export const DIRECTIONS: Directions = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 }
const { TOP, RIGHT, BOTTOM, LEFT } = DIRECTIONS;

//Represntation of a wall is "1" 
const WALL = "1";

// Constant object for mapping directions to their opposites
export const OPPOSITE_DIRECTIONS: { 
	[key: number]: number 
} = {
	[TOP]: BOTTOM,
	[RIGHT]: LEFT,
	[BOTTOM]: TOP,
	[LEFT]: RIGHT
 };
 
 
 // Constant object for representing directions
 const DIRECTIONS_CORDS: { 
	[key: number]: Coordinate
} = {
	[TOP]: { x: -1, y: 0, direction: TOP },
	[RIGHT]: { x: 0, y: 1, direction: RIGHT },
	[BOTTOM]: { x: 1, y: 0, direction: BOTTOM },
	[LEFT]: { x: 0, y: -1, direction: LEFT },
 };

/**
 * Get a unique key for a coordinate based on its row and column.
 *
 * @param {number} row - The row coordinate.
 * @param {number} column - The column coordinate.
 * @returns {string} - A unique key for the coordinate.
 */
export const getCoordinateKey = (row: number, column: number): string => `${row},${column}`;

/**
 * Validate if a coordinate is within the specified range.
 *
 * @param {number} x - The x-coordinate.
 * @param {number} y - The y-coordinate.
 * @param {number} rows - The total number of rows.
 * @param {number} columns - The total number of columns.
 * @returns {boolean} - True if the coordinate is within range; otherwise, false.
 */
const isRange = (x: number, y: number, rows: number, columns: number): boolean => (0 <= x && x < rows) && (0 <= y && y < columns);

/**
 * Update the current wall representation to include a wall in the specified direction.
 *
 * @param {string} currentWall - The current wall representation.
 * @param {number} direction - The direction to add a wall (TOP, RIGHT, BOTTOM, LEFT).
 * @returns {string} - The updated wall representation.
 */
export const updateWall = (currentWall: string, direction: number) =>
	currentWall.substring(0, direction) + WALL + currentWall.substring(direction + 1);

/**
 * Validate if a neighboring cell is within range, unvisited, and has a valid path in the maze (for the BFS algorithm).
 *
 * @param {number} direction - The direction to the neighboring cell.
 * @param {Coordinate} source - The source cell coordinates.
 * @param {Coordinate} destination - The coordinate change for the direction.
 * @param {number} rows - The total number of rows in the maze.
 * @param {number} columns - The total number of columns in the maze.
 * @param {Set<string>} visited - The set of visited cell coordinates.
 * @param {Maze} maze - The maze representation.
 * @returns {boolean} - True if the neighbor is valid; otherwise, false.
 */
const isNeighbor = (direction: number, source: Coordinate, destination: Coordinate, rows: number, columns: number, visited: Set<string>, maze: Maze): boolean => {
	const x = source.x + destination.x;
	const y = source.y + destination.y;

	// Check if the neighbor is within range, has a valid path, and is unvisited
	const range = isRange(x, y, rows, columns);
	const isPathExist = range && maze[source.x][source.y][direction] !== "0";
	const isVisited = !visited.has(`${x},${y}`);

	return destination && isPathExist && isVisited;
}

/**
 * Get all unvisited neighbors for a single cell in the maze.
 *
 * @param {Coordinate} source - The source cell coordinates.
 * @param {number} rows - The total number of rows in the maze.
 * @param {number} columns - The total number of columns in the maze.
 * @param {Maze} maze - The maze representation.
 * @param {Set<string>} visited - The set of visited cell coordinates.
 * @returns {Coordinate[]} - An array of unvisited neighbor coordinates.
 */
export const getNeighbors = (source: Coordinate, rows: number, columns: number, maze: Maze, visited: Set<string>): Coordinate[] => {
	const neighbors: Coordinate[] = [];

	for (let direction of [TOP, RIGHT, BOTTOM, LEFT]) {
		const destination = DIRECTIONS_CORDS[direction];
		if (!destination) continue;

		const x = source.x + destination.x;
		const y = source.y + destination.y;
		if (isNeighbor(direction, source, destination, rows, columns, visited, maze))
			neighbors.push({ x, y, direction });
		}
  return neighbors;
}

export const getDirection = (source: Coordinate, destination: Coordinate): number => {
	const dx = destination.x - source.x;
	const dy = destination.y - source.y;

	if(dx === 0 && dy === -1) 			return TOP;
	else if (dx === 0 && dy === 1) 	return BOTTOM;
	else if (dx === -1 && dy === 0) 	return LEFT;
	else if (dx === 1 && dy === 0) 	return RIGHT;

	throw new Error("Invalid coordinates: cells must be neighbors.");
};
