import { useEffect, useState } from 'react';

import Tile, { TileProps, TileType } from './Tile';
import { Vector3 } from 'three';

type GridProps = {
	size: [number, number];
};

function getTilesFromProps(props: TileProps[], tileClickHandler: (tileProps: TileProps) => void): Array<JSX.Element> {
	const tileElements = [];
	for (const prop of props) {
		tileElements.push(<Tile tileClickHandler={tileClickHandler} {...prop} />);
	}
	return tileElements;
}

//function to create random tiletype
function getRandomTileType(): number {
	//const tileTypes = Object.values(TileType).map(value => value as TileType);
	//return tileTypes[Math.floor(Math.random() * tileTypes.length)];
	return Math.floor(Math.random() * 6);
}

export default function Grid({ size }: GridProps) {
	const [tiles, setTiles] = useState<TileProps[]>([]);
	const [emptyTile, setEmptyTile] = useState<[number, number]>([0, 0]);

	function addTile(newTile: TileProps) {
		setTiles(tiles => [...tiles, newTile]);
	}

	function removeTile(gridPosition: [number, number]) {
		setTiles(tiles.filter(item => item.gridPosition != gridPosition));
	}

	function tileClickHandler({ Vector1, Vector2, tileType, color, gridPosition }: TileProps) {
		if (isNeighbourOfEmptyTile(gridPosition)) {
			// swap positions of clicked and empty tile
			const bufferedEmptyTile = emptyTile;
			setEmptyTile(gridPosition);
			removeTile(gridPosition);
			gridPosition = bufferedEmptyTile;
			addTile({ Vector1, Vector2, color, tileType, gridPosition });
		}
	}

	function isNeighbourOfEmptyTile(gridPosition: [number, number]): boolean {
		const xDistanceToEmpty = Math.abs(gridPosition[0] - emptyTile[0]);
		const yDistanceToEmpty = Math.abs(gridPosition[1] - emptyTile[1]);
		// check if tile is direct neighbour, diagonals dont count
		// -> if true tile can be swapped into the space of the empty tile
		return (xDistanceToEmpty <= 1 && yDistanceToEmpty == 0) || (yDistanceToEmpty <= 1 && xDistanceToEmpty == 0);
	}

	function checkVictory(): boolean {
		const tileList = tiles;
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
				// @ts-ignore
				z.push(oneDimensionArray.pop());
			}
			twoDimensionArray[x] = [];
			twoDimensionArray[x] = twoDimensionArray[x].concat(z);
		}
		//starting position coordinates
		let x = -1;
		let y = 3;
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
					console.log('wtf are you doing here');
					return false;
			}
			if (x == size[0] && y == 0 && currentDirection == direction.right) {
				console.log('YOU WIN');
				return true;
			}
			// Team outofbounds
			if (x < 0 || y < 0 || y > 3 || x > 3) {
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
					if (currentDirection == direction.left) {
					} else if (currentDirection == direction.right) {
					} else {
						return false;
					}
					break;
				case TileType.StraightInverted:
					if (currentDirection == direction.up) {
					} else if (currentDirection == direction.down) {
					} else {
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

	function generateFunctioningTable() {
		//in order to keep the game simple,these are the minimum required tiles
		let possibleBoard = [0, 5, 2];
		//three different arrangements that will make the game solvable
		const RAND = Math.ceil(Math.random() * 3);
		if (RAND == 1) {
			const OPTION1 = [2, 2, 3, 3];
			possibleBoard.push(...OPTION1);
		}
		if (RAND == 2) {
			const OPTION2 = [0, 0, 5, 5];
			possibleBoard.push(...OPTION2);
		}
		if (RAND == 3) {
			const OPTION3 = [0, 2, 3, 5];
			possibleBoard.push(...OPTION3);
		}
		// at this pont the board is solvable and we can fill it with random tiles
		for (let x = 0; x < size[0] * size[1] - 8; x++) {
			possibleBoard.push(getRandomTileType());
		}
		possibleBoard = shuffle(possibleBoard);
		return possibleBoard;
	}

	useEffect(() => {
		const TILES = generateFunctioningTable();
		let counter = 0;
		for (let x = 0; x < size[0]; x++) {
			for (let y = 0; y < size[1]; y++) {
				if (!(x === 0 && y === 0)) {
					// exclude default empty tile
					addTile({
						gridPosition: [x, y],
						Vector1: new Vector3(-3 / 2, 0, 0),
						Vector2: new Vector3(3 / 2, 0, 0),
						tileType: TILES[counter],
					});
					counter++;
				}
			}
		}
	}, [size]);
	if (checkVictory()) {
	}

	return <>{...getTilesFromProps(tiles, tileClickHandler)}</>;
}
