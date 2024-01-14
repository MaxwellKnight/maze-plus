import { Dispatch, SetStateAction } from "react";
import { createMazeDFS, bfs_shortest_path } from "../../algorithms";
import { Maze, Coordinate } from "../../types/algorithms.types";
import { forEach } from "../../utils/animation.utils";

const DEFAULT_DELAY = 5;


/**
	 * Animate the creation of a maze using the Depth-First Search algorithm.
	 *
	 * @param {number} delay - The delay between each iteration in milliseconds.
	 */
export const animateMazeDFS = async (delay: number = DEFAULT_DELAY, maze: Maze, setMaze: Dispatch<SetStateAction<Maze>>, setCurrentCell: Dispatch<SetStateAction<Coordinate>>) => {
	const [finalMaze, trail] = createMazeDFS(maze.length, maze[0].length);

	await forEach(trail,(coordinate: Coordinate) => {
		const { x, y } = coordinate;
		const tempMaze = [...maze];
		tempMaze[x][y] = finalMaze[x][y];

		setMaze(() => tempMaze);
		setCurrentCell({ x, y });
	}, delay);
};

/**
 * Animate the shortest path using the Breadth-First Search algorithm.
 *
 * @param {number} delay - The delay between each iteration in milliseconds.
 */
export const animateShortestPathBFS = async (delay: number = DEFAULT_DELAY, maze: Maze, setMaze: Dispatch<SetStateAction<Maze>>, setDestinationCell: Dispatch<SetStateAction<Coordinate | null>>) => {
	const START_COORDS = { x: 0, y: 0 };
	const END_COORDS = { x: maze.length - 1, y: maze[0].length - 1 };
	
	const result = bfs_shortest_path({ source: START_COORDS, destination: END_COORDS }, maze);
	if (!result || result[0].length === 0) {
		console.error("Error with result bfs_shortest_path");
		return;
	}

	const [shortest, _] = result;

	await forEach(shortest, (coordinate: Coordinate, index: number) => {
		const { x, y } = coordinate;
		const tempMaze = [...maze];
		tempMaze[x][y] = maze[x][y] + "0";

		setMaze(() => tempMaze);
		if (index === shortest.length - 1) setDestinationCell(() => ({ x, y }));

	}, delay);
};

/**
 * Animate the search path using the Breadth-First Search algorithm.
 *
 * @param {number} delay - The delay between each iteration in milliseconds.
 */
export const animateSearchBFS = async (delay: number = DEFAULT_DELAY, maze: Maze, setMaze: Dispatch<SetStateAction<Maze>>, setDestinationCell: Dispatch<SetStateAction<Coordinate | null>>) => {
	const START_COORDS = { x: 0, y: 0 };
	const END_COORDS = { x: maze.length - 1, y: maze[0].length - 1 };
	
	const result = bfs_shortest_path({ source: START_COORDS, destination: END_COORDS }, maze);
	if (!result || result[0].length === 0) {
		console.error("Error with result bfs_shortest_path");
		return;
	}

	const [_, path] = result;

	await forEach(path, (coordinate: Coordinate, index: number) => {
		const { x, y } = coordinate;
		const tempMaze = [...maze];
		tempMaze[x][y] = maze[x][y] + "1";

		setMaze(() => tempMaze);

		if (index === path.length - 1) setDestinationCell(() => ({ x, y }));

	}, delay);
};