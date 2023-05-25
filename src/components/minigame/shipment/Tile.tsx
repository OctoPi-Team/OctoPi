import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export type TileProps = {
	gridPosition: [number, number];
	tileClickHandler?: (tileProps: TileProps) => void;
};

const GRID_SPACING = 0.5;
const TILE_SIZE = 3;

function getRealPositionFromGridPosition(gridPosition: [number, number]): Vector3 {
	return new Vector3(
		gridPosition[0] * GRID_SPACING + gridPosition[0] * TILE_SIZE,
		0,
		gridPosition[1] * GRID_SPACING + gridPosition[1] * TILE_SIZE
	);
}

export default function Tile({ gridPosition, tileClickHandler }: TileProps) {
	const ref = useRef<Mesh>(null);
	useEffect(() => {
		if (ref && ref.current) {
			const meshPosition = getRealPositionFromGridPosition(gridPosition);
			ref.current.position.copy(meshPosition);
		}
	}, gridPosition);

	return (
		<>
			<mesh
				ref={ref}
				onClick={() => {
					if (tileClickHandler) tileClickHandler({ gridPosition: gridPosition });
				}}>
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color={'yellow'} />
			</mesh>
		</>
	);
}
