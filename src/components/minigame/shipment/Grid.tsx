import { useEffect, useState } from 'react';
import Tile, { TileProps } from './Tile';
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

export default function Grid({ size }: GridProps) {
	const [tiles, setTiles] = useState<TileProps[]>([]);
	const [emptyTile, setEmptyTile] = useState<[number, number]>([0, 0]);

	function addTile(newTile: TileProps) {
		setTiles(tiles => [...tiles, newTile]);
	}

	function removeTile(gridPosition: [number, number]) {
		setTiles(tiles.filter(item => item.gridPosition != gridPosition));
	}

	function tileClickHandler({ VectorX, VectorZ, hasAngleVector, directionRight, color, gridPosition }: TileProps) {
		if (isNeighbourOfEmptyTile(gridPosition)) {
			// swap positions of clicked and empty tile
			const bufferedEmptyTile = emptyTile;
			setEmptyTile(gridPosition);
			removeTile(gridPosition);
			gridPosition = bufferedEmptyTile;
			addTile({ VectorX, VectorZ, color, hasAngleVector, directionRight, gridPosition });
		}
	}

	function isNeighbourOfEmptyTile(gridPosition: [number, number]): boolean {
		const xDistanceToEmpty = Math.abs(gridPosition[0] - emptyTile[0]);
		const yDistanceToEmpty = Math.abs(gridPosition[1] - emptyTile[1]);
		// check if tile is direct neighbour, diagonals dont count
		// -> if true tile can be swapped into the space of the empty tile
		return (xDistanceToEmpty <= 1 && yDistanceToEmpty == 0) || (yDistanceToEmpty <= 1 && xDistanceToEmpty == 0);
	}

	useEffect(() => {
		for (let x = 0; x < size[0]; x++) {
			for (let y = 0; y < size[1]; y++) {
				if (!(x === 0 && y === 0)) {
					// exclude default empty tile
					addTile({
						gridPosition: [x, y],
						VectorX: new Vector3(-3 / 2, 0, 0),
						VectorZ: new Vector3(3 / 2, 0, 0),
						hasAngleVector: Math.random() < 0.5,
						directionRight: Math.random() < 0.5,
					});
				}
			}
		}
	}, [size]);
	return <>{...getTilesFromProps(tiles, tileClickHandler)}</>;
}
