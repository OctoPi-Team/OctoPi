import { useEffect, useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import Tube from '../../overworld/objects/Tube';

export type TileProps = {
	gridPosition: [number, number];
	tileClickHandler?: (tileProps: TileProps) => void;
};

const GRID_SPACING = 0.5;
const TILE_SIZE = 3;
const randomVectorX = new Vector3(0, 0, -TILE_SIZE / 2);
const randomVectorZ = new Vector3(0, 0, TILE_SIZE / 2 - 0.4); // if right angle the z axis - 0.4
const rightAngleVector = new Vector3(TILE_SIZE / 2, 0, Math.PI / 2 - 0.4);

// Rotate the vector by 90 degrees around the y-axis to make it a right angle vector
//rightAngleVector.applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
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
				<Tube position={[0, 0, 0]} color={'black'} vectors={[randomVectorX, randomVectorZ, rightAngleVector]} />
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color={'yellow'} />
			</mesh>
		</>
	);
}
