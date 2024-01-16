import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { animateMazeDFS, animateSearchBFS, animateShortestPathBFS } from "./animations";
import { Coordinate, Maze } from "../../types/algorithms.types";
import { execute } from "../../utils/animation.utils";
import Cell from '../cell/Cell';
import './board.css';

const DEFAULT_CELL = "0000";
export const createMaze = (rows: number, columns: number) => Array(rows).fill([]).map(() => Array(columns).fill(DEFAULT_CELL));

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

	const drawMaze = async () => await execute()
		.add(() => (setIsDrawing(true), setIsDone(false)))								
		.add(() => animateMazeDFS(defaultDelay, maze, setMaze, setCurrentCell))
		.add(() => animateSearchBFS(defaultDelay, maze, setMaze, setDestinationCell))
		.add(() => animateShortestPathBFS(defaultDelay, maze, setMaze, setDestinationCell))
		.start()
		.catch(error => {
			console.error("Error in drawMaze: ", error);
			throw new Error("Error in drawMaze");
		})
		.finally(() => (setIsDrawing(false), setIsDone(true)));
													

	return (
		<table className="table">
			<tbody>
				{maze.map((row, x) => (
					<tr key={x} className='table-row'>
						{row.map((walls, y) =>
							<Cell
								key={`${x},${y}`}
								walls={walls}
								isDestination={destinationCell && destinationCell.x === x && destinationCell.y === y}
								isCurrent={currentCell.x === x && currentCell.y === y} 
							/>
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Board