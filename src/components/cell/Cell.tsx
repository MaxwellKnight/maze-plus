import './cell.css';

const BORDER_ACTIVE = '0';

interface CellProps extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  isCurrent: boolean;
  walls: string;
  isDestination: boolean | null;
}

/**
 * Returns a string representing the CSS classes for a table cell based on its properties.
 *
 * @param isCurrent - Boolean indicating if the cell is the current active cell.
 * @param isDestination - Boolean indicating if the cell is the destination.
 * @param walls - String representation of the cell's state.
 * @returns A string of CSS classes for styling the table cell.
 */
const getClassList = (
	isCurrent: boolean,
	isDestination: boolean | null,
	walls: string
 ): string => {
	const [top, right, bottom, left] = walls.split('');
	let cellClass = 'table-cell ';
	
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

const Cell = ({ isCurrent, walls, isDestination, className, ...attr }: CellProps) => {
	const classList = getClassList(isCurrent, isDestination, walls);
	return (
		<td className={`${classList} ${className}`} {...attr}>
			{/* */}
		</td>
	);
};

export default Cell;
