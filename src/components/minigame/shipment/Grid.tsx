import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Tile, { TileProps, TileType } from './Tile';
import { FinalTube } from './FinalTube';
import { Vector3 } from 'three';

enum direction {
	right,
	left,
	up,
	down,
}

type GridProps = {
	isFinished: Dispatch<SetStateAction<boolean>>;
	currentVariation: number;
	vectorsForInputTube: Vector3[];
};

export default function Grid({ isFinished, currentVariation, vectorsForInputTube }: GridProps) {
	const [done, setDone] = useState(true);
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
	}

	function tileClickHandler({ startVector, endVector, tileType, color, gridPosition }: TileProps) {
		if (isNeighbourOfEmptyTile(gridPosition, emptyTile)) {
			// swap positions of clicked and empty tile
			const bufferedEmptyTile = emptyTile;
			setEmptyTile(gridPosition);
			removeTile(gridPosition);
			gridPosition = bufferedEmptyTile;
			addTile(
				{
					gridPosition: gridPosition,
					startVector: startVector,
					endVector: endVector,
					tileType: tileType,
					color: color,
					getRealPositionFromGridPosition: getRealPositionFromGridPosition,
					tileSize: GameSpec.tileSize
				},
				gridPosition[0],
				gridPosition[1]
			);
		}
	}

	function onUpdate(currentVariation: number) {
		if (!tiles.every(a => !a.length)) {
			return [];
		}
		const { board, emptyTile } = generateFunctioningGrid(currentVariation);
		setEmptyTile(emptyTile);
		for (let x = 0; x < GameSpec.sizeOfGameMatrix[0]; x++) {
			for (let y = 0; y < GameSpec.sizeOfGameMatrix[1]; y++) {
				// exclude default empty tile
				addTile(
					{
						gridPosition: [x, y],
						startVector: new Vector3(-3 / 2, 0, 0),
						endVector: new Vector3(3 / 2, 0, 0),
						tileType: board[x][y],
						getRealPositionFromGridPosition: getRealPositionFromGridPosition,
						tileSize: GameSpec.tileSize
					}, x, y
				);
			}
		}
	}

	useEffect(() => {
		onUpdate(currentVariation);
	}, [currentVariation]);

	onUpdate(currentVariation);

	const victoryCondition = checkVictory(tiles);
	if (victoryCondition.length > 0 && done) {
		setDone(false);
		setTimeout(() => {
			isFinished(true);
		}, 1500);
	}
	return (
		<>
			{getTilesFromProps(tiles, tileClickHandler, victoryCondition.length == 0)}
			{typeof victoryCondition !== 'undefined' && victoryCondition.length > 0 && <FinalTube getRealPositionFromGridPosition={getRealPositionFromGridPosition} vectorsForInputTube={vectorsForInputTube} victoryTileSequence={...victoryCondition} />}
		</>
	);
}

function getRealPositionFromGridPosition(gridPosition: [number, number]): Vector3 {
	return new Vector3(
		gridPosition[0] * GameSpec.spacing + gridPosition[0] * GameSpec.tileSize,
		0,
		gridPosition[1] * GameSpec.spacing + gridPosition[1] * GameSpec.tileSize
	);
}

function getTilesFromProps(props: TileProps[][], tileClickHandler: (tileProps: TileProps) => void, renderTubes: boolean): Array<JSX.Element> {
	if (props.every(a => !a.length)) {
		return [];
	}
	const oneDimension = [];
	for (let i = 0; i < GameSpec.sizeOfGameMatrix[0]; i++) {
		for (let j = 0; j < GameSpec.sizeOfGameMatrix[1]; j++) {
			if (props[i][j].tileType == 6) {
				continue;
			}
			oneDimension.push(props[i][j]);
		}
	}
	return oneDimension.map((prop, index) => (
		<Tile key={index} tileClickHandler={tileClickHandler} render={renderTubes} {...prop} />
	));
}

function getRandomTileType(): number {
	return Math.floor(Math.random() * 6);
}

function isNeighbourOfEmptyTile(gridPosition: [number, number], emptyTile: [number, number]): boolean {
	const xDistanceToEmpty = Math.abs(gridPosition[0] - emptyTile[0]);
	const yDistanceToEmpty = Math.abs(gridPosition[1] - emptyTile[1]);
	// check if tile is direct neighbour, diagonals and same tilePos dont count
	// -> if true tile can be swapped into the space of the empty tile
	console.log(gridPosition[0] == emptyTile[0] && gridPosition[1] == emptyTile[1]);
	return (
		!(gridPosition[0] == emptyTile[0] && gridPosition[1] == emptyTile[1]) &&
		((xDistanceToEmpty <= 1 && yDistanceToEmpty == 0) || (yDistanceToEmpty <= 1 && xDistanceToEmpty == 0))
	);
}

function initialize2DArray() {
	const array = [];
	for (let x = 0; x < GameSpec.sizeOfGameMatrix[0]; x++) {
		array[x] = [];
	}
	return array;
}

function checkVictory(tiles: TileProps[][]): TileProps[] {
	const victoryPath: TileProps[] = [];
	let x = -1;
	let y: number = GameSpec.sizeOfGameMatrix[1] - 1;

	let currentDirection: direction = direction.right;
	for (let z = 0; z < GameSpec.sizeOfGameMatrix[0] * GameSpec.sizeOfGameMatrix[1]; z++) {
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
		// final Tile
		if (x == GameSpec.sizeOfGameMatrix[0] && y == 0 && currentDirection == direction.right) {
			return victoryPath;
		}
		// outside the grid
		else if (x < 0 || y < 0 || y >= GameSpec.sizeOfGameMatrix[1] || x >= GameSpec.sizeOfGameMatrix[0]) {
			return [];
		}
		// into the empty tile
		else if (tiles[x][y].tileType == 6) {
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
				if (currentDirection == direction.left || currentDirection == direction.right) {
					break;
				} else {
					return [];
				}
			case TileType.StraightInverted:
				if (currentDirection == direction.up || currentDirection == direction.down) {
					break;
				} else {
					return [];
				}
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

type TableProp = {
	board: [[number, number, number], [number, number, number], [number, number, number]];
	emptyTile: [number, number];
};

function generateFunctioningGrid(variant: number): TableProp {
	// returns the seected pre configured grid
	// they are preconfigured to assure difficulty balancing
	switch (variant) {
		case 0:
			return {
				board: [
					[5, 6, 5],
					[5, 3, 0],
					[2, 0, 0],
				],
				emptyTile: [0, 1],
			};
		case 1:
			return {
				board: [
					[5, 2, 0],
					[3, 5, 3],
					[0, 2, 6],
				],
				emptyTile: [2, 2],
			};
		case 2:
			return {
				board: [
					[3, 5, 0],
					[0, 2, 0],
					[5, 6, 5],
				],
				emptyTile: [2, 1],
			};
		case 3:
			return {
				board: [
					[3, 0, 2],
					[3, 5, 6],
					[5, 0, 2],
				],
				emptyTile: [1, 2],
			};
		case 4:
			return {
				board: [
					[6, 5, 2],
					[2, 0, 3],
					[0, 0, 5],
				],
				emptyTile: [0, 0],
			};
		default:
			return {
				board: [
					[3, 2, 5],
					[2, 6, 5],
					[3, 0, 0],
				],
				emptyTile: [1, 1],
			};
	}
}

export const ExportedForTestingOnly = {
	getTilesFromProps,
	checkVictory,
	isNeighbourOfEmptyTile,
	getRandomTileType,
	generateFunctioningGrid,
};
