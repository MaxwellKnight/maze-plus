import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Coordinate, Maze } from "../../types/algorithms.types";
import { forEach, execute } from "../../utils/animation.utils";
import Cell from '../cell/Cell';
import './board.css'
import { bfs_shortest_path, createMazeDFS } from "../../algorithms";

const DEFAULT_DELAY = 5;
const DEFAULT_CELL = "0000";
const createMaze = (rows: number, columns: number) => Array(rows).fill([]).map(() => Array(columns).fill(DEFAULT_CELL));

type DrawingType = {
	isDrawing: boolean;
	setIsDrawing: Dispatch<SetStateAction<boolean>>;
	isDone: boolean;
	setIsDone: Dispatch<SetStateAction<boolean>>;
}
type BoardProps = {
	rows: number;
	columns: number;
	defaultDelay: number;
	reset: boolean;
	setReset: Dispatch<SetStateAction<boolean>>;
	drawing: DrawingType;
}
	
const Board = ({ rows, columns, defaultDelay, reset, drawing, setReset }: BoardProps) => {
	const START_COORDS = { x: 0, y: 0 };
	const END_COORDS = { x: rows - 1, y: columns - 1 };
	const { isDrawing, setIsDrawing, setIsDone } = drawing;

	const [maze, setMaze] = useState<Maze>(createMaze(rows, columns));
	const [currentCell, setCurrentCell] = useState<Coordinate>(START_COORDS);
	const [destinationCell, setDestinationCell] = useState<Coordinate | null>(null);
	
	useEffect(() => {
		if(reset){
			setMaze((createMaze(rows, columns)));
			setCurrentCell(START_COORDS);
			setDestinationCell(null);
			setIsDone(false);
			setReset(false);
		}

		if(isDrawing) drawMaze();
	}, [rows, columns, reset, isDrawing]);

	/**
	 * Animate the creation of a maze using the Depth-First Search algorithm.
	 *
	 * @param {number} delay - The delay between each iteration in milliseconds.
	 */
	const animateMazeDFS = async (delay: number = DEFAULT_DELAY) => {
		const [finalMaze, trail] = createMazeDFS(rows, columns);

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
	const animateShortestPathBFS = async (delay: number = DEFAULT_DELAY) => {
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
	const animateSearchBFS = async (delay: number = DEFAULT_DELAY) => {
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

	const drawMaze = async () => await execute()
		.add(() => (setIsDrawing(true), setIsDone(false)))								
		.add(() => animateMazeDFS(defaultDelay))
		.add(() => animateSearchBFS(defaultDelay))
		.add(() => animateShortestPathBFS(defaultDelay))
		.start()
		.catch(error => {
			console.error("Error in drawMaze: ", error);
			throw new Error("Error in drawMaze");
		})
		.finally(() => (setIsDrawing(false), setIsDone(true)));
													

	return (
		<table className="table">
			<tbody>
				{maze.map((row, rIndex) => (
					<tr key={rIndex} className='table-row'>
						{row.map((borders, cIndex) =>
							<Cell
								key={cIndex}
								cell={maze[rIndex][cIndex]}
								destination={destinationCell && destinationCell.x === rIndex && destinationCell.y === cIndex}
								borders={borders}
								current={currentCell.x === rIndex && currentCell.y === cIndex} />
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Board