import './cell.css';

const BORDER_ACTIVE = 0;

interface CellProps {
  borders: string;
  current: boolean;
  cell: string;
  destination: boolean | null;
}

const getClassList = (
  borders: { top: number; right: number; bottom: number; left: number },
  isCurrent: boolean,
  cell: string,
  isDestination: boolean | null
): string => {
	let cellClass = 'table-cell ';
	const { top, right, bottom, left } = borders;

	if (cell.length > 5 && cell[5] === '0') 
		cellClass += 'on-path ';
	if(cell.length > 4 && cell[4] === '1')
		cellClass += 'on-search ';

	if (isDestination) cellClass += 'destination-cell ';
	if (top === right && right === bottom && bottom === left && left === BORDER_ACTIVE) return 'unvisited';
	if (top === BORDER_ACTIVE) 		cellClass += 'top ';
	if (right === BORDER_ACTIVE) 	cellClass += 'right ';
	if (bottom === BORDER_ACTIVE) 	cellClass += 'bottom ';
	if (left === BORDER_ACTIVE) 	cellClass += 'left ';
	if (isCurrent) cellClass += 'active ';

  return cellClass;
};

const Cell = ({ borders, current, cell, destination }: CellProps) => {
  const [top, right, bottom, left] = borders.split('').map(Number);

  return (
    <td className={getClassList({ top, right, bottom, left }, current, cell, destination)}>
      {/* Content goes here if needed */}
    </td>
  );
};

export default Cell;