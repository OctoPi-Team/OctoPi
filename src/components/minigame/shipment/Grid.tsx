import { useEffect, useState } from 'react';
import Tile, { TileProps } from './Tile';
import { isYieldExpression } from 'typescript';
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

	function removeTile(tileToRemove: TileProps) {
		setTiles(tiles.filter(item => item.gridPosition != tileToRemove.gridPosition));
	}

	function tileClickHandler(props: TileProps) {
		if (isNeighbourOfEmptyTile(props)) {
			// swap positions of clicked and empty tile
			const bufferedEmptyTile = emptyTile;
			setEmptyTile(props.gridPosition);
			removeTile(props);
			props.gridPosition = bufferedEmptyTile;
			addTile(props);
		}
	}

	function isNeighbourOfEmptyTile(tileToCheck: TileProps): boolean {
		const xDistanceToEmpty = Math.abs(tileToCheck.gridPosition[0] - emptyTile[0]);
		const yDistanceToEmpty = Math.abs(tileToCheck.gridPosition[1] - emptyTile[1]);
		// check if tile is direct neighbour, diagonals dont count
		// -> if true tile can be swapped into the space of the empty tile
		return (xDistanceToEmpty <= 1 && yDistanceToEmpty == 0) || (yDistanceToEmpty <= 1 && xDistanceToEmpty == 0);
	}

	useEffect(() => {
		for (let x = 0; x < size[0]; x++) {
			for (let y = 0; y < size[1]; y++) {
				if (!(x == 0 && y == 0))
					// exclude default empty tile
					addTile({
						gridPosition: [x, y],
						VectorX: new Vector3(-3 / 2, 0, 0),
						VectorZ: new Vector3(3 / 2, 0, 0),
						hasrightAngleVector: true,
						directionRight: true,
					});
			}
		}
	}, [size]);
	return <>{...getTilesFromProps(tiles, tileClickHandler)}</>;
}
