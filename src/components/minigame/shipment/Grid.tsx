import { useEffect, useState } from 'react';

import Tile, { TileProps, TileType } from './Tile';
import { Vector3 } from 'three';
import { FinalTube } from './FinalTube';
import { SIZE_OF_GAME_MATRIX } from './ShipmentGame';

enum direction {
	right,
	left,
	up,
	down,
}

type GridProps = {
	size: [number, number];
	stateChanger: (value: boolean) => void;
};

function getTilesFromProps(
	props: TileProps[][],
	tileClickHandler: (tileProps: TileProps) => void,
	Victorypath: TileProps[]
): Array<JSX.Element> {
	const tileElements = [];
	const oneDimension = [];
	const render = Victorypath.length == 0 ? true : false;
	if (
		props.every(function (a) {
			return !a.length;
		})
	) {
		return [];
	}
	for (let i = 0; i < SIZE_OF_GAME_MATRIX[0]; i++) {
		for (let j = 0; j < SIZE_OF_GAME_MATRIX[1]; j++) {
			if (props[i][j].tileType == 6) {
				continue;
			}
			oneDimension.push(props[i][j]);
		}
	}

	for (const prop of oneDimension) {
		tileElements.push(<Tile tileClickHandler={tileClickHandler} {...prop} render={render} />);
	}
	return tileElements;
}

//function to create random tiletype
function getRandomTileType(): number {
	//const tileTypes = Object.values(TileType).map(value => value as TileType);
	//return tileTypes[Math.floor(Math.random() * tileTypes.length)];
	return Math.floor(Math.random() * 6);
}

function isNeighbourOfEmptyTile(gridPosition: [number, number], emptyTile: [number, number]): boolean {
	const xDistanceToEmpty = Math.abs(gridPosition[0] - emptyTile[0]);
	const yDistanceToEmpty = Math.abs(gridPosition[1] - emptyTile[1]);
	// check if tile is direct neighbour, diagonals dont count
	// -> if true tile can be swapped into the space of the empty tile
	return (xDistanceToEmpty <= 1 && yDistanceToEmpty == 0) || (yDistanceToEmpty <= 1 && xDistanceToEmpty == 0);
}

function checkVictory(size: [number, number], emptyTile: [number, number], tileList: TileProps[]): boolean {
	tileList.sort((a, b) => (a.gridPosition > b.gridPosition ? 1 : -1));
	if (tileList.length == 0) return false;
	const oneDimensionArray: number[] = [];
	tileList.forEach(tile => {
		oneDimensionArray.push(tile.tileType);
	});
	const twoDimensionArray: number[][] = [];
	let z: number[];
	oneDimensionArray.reverse();
	for (let x = 0; x < size[0]; x++) {
		z = [];
		for (let y = 0; y < size[1]; y++) {
			if (x == emptyTile[0] && y == emptyTile[1]) {
				//empty	tile
				z.push(-1);
				continue;
			}
			const nextValue = oneDimensionArray.pop();
			if (nextValue) z.push(nextValue);
		}
		twoDimensionArray[x] = [];
		twoDimensionArray[x] = twoDimensionArray[x].concat(z);
	}
	//starting position coordinates
	let x = -1;
	let y = SIZE_OF_GAME_MATRIX[1] - 1;
	enum direction {
		right,
		left,
		up,
		down,
	}
	let currentDirection: direction = direction.right;
	for (let z = 0; z < size[0] * size[1]; z++) {
		//moving into new tile
		switch (+currentDirection) {
			case direction.right:
				x++;
				break;
			case direction.left:
				x--;
				break;
			case direction.up:
				y--;
				break;
			case direction.down:
				y++;
				break;
			default:
				// this case is not supposed to happen
				return false;
		}
		if (x == size[0] && y == 0 && currentDirection == direction.right) {
			return true;
		}
		// Team outofbounds
		if (x < 0 || y < 0 || y > SIZE_OF_GAME_MATRIX[1] || x > SIZE_OF_GAME_MATRIX[0]) {
			return false;
		}
		if (twoDimensionArray[x][y] == -1) {
			return false;
		}

		//changing direction
		switch (twoDimensionArray[x][y]) {
			case TileType.AngleRightInverted:
				if (currentDirection == direction.left) {
					currentDirection = direction.up;
				} else if (currentDirection == direction.down) {
					currentDirection = direction.right;
				} else {
					return false;
				}
				break;
			case TileType.AngleRight:
				if (currentDirection == direction.right) {
					currentDirection = direction.up;
				} else if (currentDirection == direction.down) {
					currentDirection = direction.left;
				} else {
					return false;
				}
				break;
			case TileType.AngleLeft:
				if (currentDirection == direction.right) {
					currentDirection = direction.down;
				} else if (currentDirection == direction.up) {
					currentDirection = direction.left;
				} else {
					return false;
				}
				break;
			case TileType.StraightNormal:
				if (currentDirection != direction.left && currentDirection != direction.right) {
					return false;
				}
				break;
			case TileType.StraightInverted:
				if (currentDirection != direction.up && currentDirection != direction.down) {
					return false;
				}
				break;
			case TileType.AngleLeftInverted:
				if (currentDirection == direction.up) {
					currentDirection = direction.right;
				} else if (currentDirection == direction.left) {
					currentDirection = direction.down;
				} else {
					return false;
				}
				break;
		}
	}
	return false;
}
function shuffle<T>(array: T[]): T[] {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

function generateFunctioningTable(size: [number, number]) {
	//in order to keep the game simple,these are the minimum required tiles
	let possibleBoard = [0, 5, 2];
	//three different arrangements that will make the game solvable
	const RAND = Math.ceil(Math.random() * 3);
	if (RAND == 1) {
		const OPTION1 = [2, 3];
		possibleBoard.push(...OPTION1);
	}
	if (RAND == 2) {
		const OPTION2 = [0, 5];
		possibleBoard.push(...OPTION2);
	}
	if (RAND == 3) {
		const OPTION3 = [0, 5];
		possibleBoard.push(...OPTION3);
	}
	// at this pont the board is solvable and we can fill it with random tiles
	for (let x = 0; x < size[0] * size[1] - 6; x++) {
		possibleBoard.push(getRandomTileType());
	}
	possibleBoard = shuffle(possibleBoard);
	return possibleBoard;
}

function initialize2DArray() {
	const array = [];
	for (let x = 0; x < SIZE_OF_GAME_MATRIX[0]; x++) {
		array[x] = [];
	}
	return array;
}

export default function Grid({ size, stateChanger }: GridProps) {
	const [done, setdone] = useState(true);
	const [tiles, setTiles] = useState<TileProps[][]>(initialize2DArray());
	const [emptyTile, setEmptyTile] = useState<[number, number]>([0, 0]);
	function addTile(newTile: TileProps, x: number, z: number) {
		const copy = tiles;
		copy[x][z] = newTile;
		setTiles(copy);
	}

	function removeTile(gridPosition: [number, number]) {
		const copy = tiles;
		copy[gridPosition[0]][gridPosition[1]].tileType = 6;
		setTiles(copy);
		//setTiles(tiles.filter(item => item.gridPosition != gridPosition));
	}

	function tileClickHandler({ Vector1, Vector2, tileType, color, gridPosition }: TileProps) {
		if (isNeighbourOfEmptyTile(gridPosition)) {
			// swap positions of clicked and empty tile
			const bufferedEmptyTile = emptyTile;
			setEmptyTile(gridPosition);
			removeTile(gridPosition);
			gridPosition = bufferedEmptyTile;
			addTile({ Vector1, Vector2, color, tileType, gridPosition }, gridPosition[0], gridPosition[1]);
		}
	}

	function isNeighbourOfEmptyTile(gridPosition: [number, number]): boolean {
		const xDistanceToEmpty = Math.abs(gridPosition[0] - emptyTile[0]);
		const yDistanceToEmpty = Math.abs(gridPosition[1] - emptyTile[1]);
		// check if tile is direct neighbour, diagonals dont count
		// -> if true tile can be swapped into the space of the empty tile
		return (xDistanceToEmpty <= 1 && yDistanceToEmpty == 0) || (yDistanceToEmpty <= 1 && xDistanceToEmpty == 0);
	}

	function checkVictory(): TileProps[] {
		//starting position coordinates
		const victoryPath: TileProps[] = [];
		let x = -1;
		let y: number = SIZE_OF_GAME_MATRIX[1] - 1;

		let currentDirection: direction = direction.right;
		for (let z = 0; z < size[0] * size[1]; z++) {
			//moving into new tile
			switch (+currentDirection) {
				case direction.right:
					x++;
					break;
				case direction.left:
					x--;
					break;
				case direction.up:
					y--;
					break;
				case direction.down:
					y++;
					break;
				default:
					return [];
			}
			if (x == size[0] && y == 0 && currentDirection == direction.right) {
				return victoryPath;
			}
			// Team outofbounds
			if (x < 0 || y < 0 || y > SIZE_OF_GAME_MATRIX[1] - 1 || x > SIZE_OF_GAME_MATRIX[0] - 1) {
				return [];
			}
			if (tiles[x][y].tileType == 6) {
				return [];
			}
			victoryPath.push(tiles[x][y]);

			//changing direction
			switch (tiles[x][y].tileType) {
				case TileType.AngleRightInverted:
					if (currentDirection == direction.left) {
						currentDirection = direction.up;
					} else if (currentDirection == direction.down) {
						currentDirection = direction.right;
					} else {
						return [];
					}
					break;
				case TileType.AngleRight:
					if (currentDirection == direction.right) {
						currentDirection = direction.up;
					} else if (currentDirection == direction.down) {
						currentDirection = direction.left;
					} else {
						return [];
					}
					break;
				case TileType.AngleLeft:
					if (currentDirection == direction.right) {
						currentDirection = direction.down;
					} else if (currentDirection == direction.up) {
						currentDirection = direction.left;
					} else {
						return [];
					}
					break;
				case TileType.StraightNormal:
					if (currentDirection == direction.left) {
					} else if (currentDirection == direction.right) {
					} else {
						return [];
					}
					break;
				case TileType.StraightInverted:
					if (currentDirection == direction.up) {
					} else if (currentDirection == direction.down) {
					} else {
						return [];
					}
					break;
				case TileType.AngleLeftInverted:
					if (currentDirection == direction.up) {
						currentDirection = direction.right;
					} else if (currentDirection == direction.left) {
						currentDirection = direction.down;
					} else {
						return [];
					}
					break;
			}
		}
		return [];
	}
	function shuffle<T>(array: T[]): T[] {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	function generateFunctioningTable() {
		//in order to keep the game simple,these are the minimum required tiles
		let possibleBoard = [0, 5, 2];
		//three different arrangements that will make the game solvable
		const RAND = Math.ceil(Math.random() * 3);
		if (RAND == 1) {
			const OPTION1 = [2, 3];
			possibleBoard.push(...OPTION1);
		}
		if (RAND == 2) {
			const OPTION2 = [0, 5];
			possibleBoard.push(...OPTION2);
		}
		if (RAND == 3) {
			const OPTION3 = [0, 5];
			possibleBoard.push(...OPTION3);
		}
		// at this pont the board is solvable and we can fill it with random tiles
		for (let x = 0; x < size[0] * size[1] - 6; x++) {
			possibleBoard.push(getRandomTileType());
		}
		possibleBoard = shuffle(possibleBoard);
		return possibleBoard;
	}

	function onUpdate() {
		if (
			!tiles.every(function (a) {
				return !a.length;
			})
		) {
			return [];
		}
		const TILES = generateFunctioningTable();
		let counter = 0;
		for (let x = 0; x < size[0]; x++) {
			for (let y = 0; y < size[1]; y++) {
				if (!(x === 0 && y === 0)) {
					// exclude default empty tile
					addTile(
						{
							gridPosition: [x, y],
							Vector1: new Vector3(-3 / 2, 0, 0),
							Vector2: new Vector3(3 / 2, 0, 0),
							tileType: TILES[counter],
						},
						x,
						y
					);
					counter++;
				} else {
					addTile(
						{
							gridPosition: [x, y],
							Vector1: new Vector3(-3 / 2, 0, 0),
							Vector2: new Vector3(3 / 2, 0, 0),
							tileType: 6,
						},
						x,
						y
					);
				}
			}
		}
	}

	useEffect(() => {
		onUpdate();
	}, [size]);

	onUpdate();

	const victorypath = checkVictory();
	if (victorypath.length > 0 && done) {
		setdone(false);
		setTimeout(() => {
			window.alert('Herzlichen Glückwunsch, du hast das Rohrsystem repariert!');
			stateChanger(true);
		}, 100);
	}
	return (
		<>
			{...getTilesFromProps(tiles, tileClickHandler, victorypath)}
			{typeof victorypath !== 'undefined' && victorypath.length > 0 && <FinalTube {...victorypath} />}
		</>
	);
}

export const ExportedForTestingOnly = {
	getTilesFromProps,
	shuffle,
	generateFunctioningTable,
	checkVictory,
	isNeighbourOfEmptyTile,
	getRandomTileType,
};
