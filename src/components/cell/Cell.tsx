import './cell.css';

const BORDER_ACTIVE = 0;

interface CellProps {
  borders: string;
  current: boolean;
  cell: string;
  destination: boolean | null;
}

/**
 * Returns a string representing the CSS classes for a table cell based on its properties.
 *
 * @param borders - Object containing border values (top, right, bottom, left).
 * @param isCurrent - Boolean indicating if the cell is the current active cell.
 * @param cell - String representation of the cell's state.
 * @param isDestination - Boolean indicating if the cell is the destination.
 * @returns A string of CSS classes for styling the table cell.
 */
const getClassList = (
	borders: { top: number; right: number; bottom: number; left: number },
	isCurrent: boolean,
	cell: string,
	isDestination: boolean | null
 ): string => {
	let cellClass = 'table-cell ';
	const {top, right, bottom, left} = borders;
	
	// Check for specific cell states and add corresponding CSS classes
	if (cell.length > 5 && cell[5] === '0') 
	  cellClass += 'on-path ';
	if(cell.length > 4 && cell[4] === '1')
	  cellClass += 'on-search ';
 
	if (isDestination) cellClass += 'destination-cell ';
 
	// Add border-related CSS classes based on the cell's borders
	if (top === right && right === bottom && bottom === left && left === BORDER_ACTIVE) return 'unvisited';
	if (top === BORDER_ACTIVE)     cellClass += 'top ';
	if (right === BORDER_ACTIVE)   cellClass += 'right ';
	if (bottom === BORDER_ACTIVE)  cellClass += 'bottom ';
	if (left === BORDER_ACTIVE)    cellClass += 'left ';
	if (isCurrent) cellClass += 'active ';
 
	return cellClass;
 };

const Cell = ({ borders, current, cell, destination }: CellProps) => {
  const [top, right, bottom, left] = borders.split('').map(Number);

  return (
	<td className={getClassList({ top, right, bottom, left }, current, cell, destination)}>
		{/* */}
	</td>
  );
};

export default Cell;
