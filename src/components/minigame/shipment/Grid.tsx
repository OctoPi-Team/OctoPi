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
	return Math.ceil(Math.random() * 6) - 1;
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
		let possibleboard = [0, 5, 2];
		//three different arrangements that will make the game solvable
		const RAND = Math.ceil(Math.random() * 3);
		if (RAND == 1) {
			const OPTION1 = [2, 2, 3, 3];
			possibleboard.push(...OPTION1);
		}
		if (RAND == 2) {
			const OPTION2 = [0, 0, 5, 5];
			possibleboard.push(...OPTION2);
		}
		if (RAND == 3) {
			const OPTION3 = [0, 2, 3, 5];
			possibleboard.push(...OPTION3);
		}
		// at this pont the board is solvable and we can fill it with random tiles
		for (let x = 0; x < size[0] * size[1] - 8; x++) {
			possibleboard.push(getRandomTileType());
		}
		possibleboard = shuffle(possibleboard);
		return possibleboard;
	}

	useEffect(() => {
		const TILES = generateFunctioningTable();
		let counter: number = 0;
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
	return <>{...getTilesFromProps(tiles, tileClickHandler)}</>;
}
