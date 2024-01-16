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
	let classList = 'table-cell ';
	
	// Check for specific cell states and add corresponding CSS classes
	if (walls.length > 5 && walls[5] === '0') 
	  classList += 'on-path ';
	if(walls.length > 4 && walls[4] === '1')
	  classList += 'on-search ';
 
	if (isDestination) classList += 'destination-cell ';
 
	// Add border-related CSS classes based on the cell's borders
	if (top === right && right === bottom && bottom === left && left === BORDER_ACTIVE) return 'unvisited';
	if (top === BORDER_ACTIVE)     classList += 'top ';
	if (right === BORDER_ACTIVE)   classList += 'right ';
	if (bottom === BORDER_ACTIVE)  classList += 'bottom ';
	if (left === BORDER_ACTIVE)    classList += 'left ';
	if (isCurrent) classList += 'active ';
 
	return classList;
 };

const Cell = ({ isCurrent, walls, isDestination, ...attr }: CellProps) => {
	const className = getClassList(isCurrent, isDestination, walls);

	return (
		<td className={className} {...attr}>
			{/* */}
		</td>
	);
};

export default Cell;
