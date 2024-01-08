import { useEffect, useState } from 'react'
import Board from './components/board/Board'
import './App.css'

const calculateMazeDimensions = () => {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
 
	// Adjust these values according to your preferences
	const cellSize = screenWidth > 500 ? 30 : 20; // Size of each cell in pixels
 
	// Calculate the number of columns and rows based on the screen dimensions and cell size
	const rows = Math.floor(screenWidth / cellSize);
	const columns = Math.floor(screenHeight / cellSize);
 
	return {
	  rows,
	  columns,
	};
};

const App = () => {
	const [{rows, columns}, setMazeDimensions] = useState(calculateMazeDimensions());
	const [isDrawing, setIsDrawing] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [reset, setReset] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setMazeDimensions(calculateMazeDimensions());
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);


	return (
		<main className='main'>
			<div className="controls">
				{isDone && <button onClick={() => setReset(true)}>נקה</button>}
				<button onClick={() => setIsDrawing(true)} disabled={isDrawing || isDone}>צור מבוך</button>
			</div>
			<Board 
				columns={rows} 
				rows={columns} 
				defaultDelay={1} 
				reset={reset} 
				setReset={setReset} 
				drawing={{isDrawing, setIsDrawing, isDone, setIsDone}}
			/>
		</main>
	)
}

export default App
