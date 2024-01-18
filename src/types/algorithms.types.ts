interface XY { 
	x: number; 
	y: number 
};

export interface Coordinate extends XY  { 
	direction?: number; 
	distance?: number;
	heuristic?: number; 
	path?: XY[];
};

export type Maze = string[][];

export type DirectionType = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
export type Directions = { 
	[direction in DirectionType]: number;
};