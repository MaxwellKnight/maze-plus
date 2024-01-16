import './cell.css';

const BORDER_ACTIVE = 0;

interface CellProps extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  isCurrent: boolean;
  walls: string;
  isDestination: boolean | null;
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
	directions: { top: number; right: number; bottom: number; left: number },
	isCurrent: boolean,
	walls: string,
	isDestination: boolean | null
 ): string => {
	let cellClass = 'table-cell ';
	const {top, right, bottom, left} = directions;
	
	// Check for specific cell states and add corresponding CSS classes
	if (walls.length > 5 && walls[5] === '0') 
	  cellClass += 'on-path ';
	if(walls.length > 4 && walls[4] === '1')
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

const Cell = ({ isCurrent, walls, isDestination, ...attr }: CellProps) => {
	const [top, right, bottom, left] = walls.split('').map(Number);
	const cellClass = getClassList({ top, right, bottom, left }, isCurrent, walls, isDestination);

	return (
		<td className={cellClass} {...attr}>
			{/* */}
		</td>
	);
};

export default Cell;
