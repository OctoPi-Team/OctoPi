import { useEffect, useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import Tube from '../../overworld/objects/Tube';

export type TileProps = {
	gridPosition: [number, number];
	tileClickHandler?: (tileProps: TileProps) => void;
	randomVectorX: Vector3;
	randomVectorZ: Vector3;
	hasrightAngleVector?: boolean;
	directionRight?: boolean;
};

const GRID_SPACING = 0.2;
const TILE_SIZE = 3;

function getRealPositionFromGridPosition(gridPosition: [number, number]): Vector3 {
	return new Vector3(
		gridPosition[0] * GRID_SPACING + gridPosition[0] * TILE_SIZE,
		0,
		gridPosition[1] * GRID_SPACING + gridPosition[1] * TILE_SIZE
	);
}

export default function Tile({
	gridPosition,
	tileClickHandler,
	randomVectorX,
	randomVectorZ,
	hasrightAngleVector = false,
	directionRight = false,
}: TileProps) {
	const ref = useRef<Mesh>(null);

	useEffect(() => {
		if (ref.current) {
			const meshPosition = getRealPositionFromGridPosition(gridPosition);
			ref.current.position.copy(meshPosition);
		}
	}, [gridPosition]);
	let rightAngleVector = null;
	if (hasrightAngleVector) {
		if (directionRight) {
			rightAngleVector = new Vector3(-TILE_SIZE / 2, 0, 0);
			randomVectorZ = new Vector3(randomVectorZ.x, randomVectorZ.y, 0);
		} else {
			rightAngleVector = new Vector3(TILE_SIZE / 2, 0, 0);
			randomVectorZ = new Vector3(randomVectorZ.x, randomVectorZ.y, 0);
		}
	}

	return (
		<>
			<mesh
				ref={ref}
				onClick={() => {
					if (tileClickHandler)
						tileClickHandler({ gridPosition, randomVectorX, randomVectorZ, hasrightAngleVector, directionRight });
				}}>
				<Tube
					position={[0, 0.55, 0]}
					color="#3aaa35"
					vectors={[randomVectorX, randomVectorZ, rightAngleVector].filter(vector => vector != null) as Vector3[]}
				/>
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color="#b2c4d1" />
			</mesh>
		</>
	);
}
