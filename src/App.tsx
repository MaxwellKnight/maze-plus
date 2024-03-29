import { useState } from 'react'
import Board from './components/board/Board'
import './App.css'

//in pixels
const CELL_SIZES = {
	small: 30,
	medium: 40,
	large: 50,
}

const calculateMazeDimensions = () => {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const { medium, large } = CELL_SIZES;
 
	const cellSize = screenWidth > 800 ? large : medium; // Size of each cell in pixels
 
	// Calculate the number of columns and rows based on the screen dimensions and cell size
	const rows = Math.floor(screenWidth / cellSize);
	const columns = Math.floor(screenHeight / cellSize);
 
	return {
	  rows,
	  columns,
	};
};

const App = () => {
	const {rows, columns} = calculateMazeDimensions();
	const [isDrawing, setIsDrawing] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [reset, setReset] = useState(false);


	return (
		<main className='main'>
			<div className="controls">
				{isDone && <button onClick={() => setReset(true)}>נקה</button>}
				<button onClick={() => setIsDrawing(true)} disabled={isDrawing || isDone}>צור מבוך</button>
			</div>
			<Board 
				columns={rows} 
				rows={columns} 
				defaultDelay={25} 
				reset={reset} 
				setReset={setReset} 
				drawing={{isDrawing, setIsDrawing, isDone, setIsDone}}
			/>
		</main>
	)
}

export default App
