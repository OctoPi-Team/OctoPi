import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import Tube from '../../overworld/objects/Tube';

export type TileProps = {
	gridPosition: [number, number];
	tileClickHandler?: (tileProps: TileProps) => void;
	VectorX: Vector3;
	VectorZ: Vector3;
	hasAngleVector?: boolean;
	directionRight?: boolean;
	color?: string;
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
	VectorX,
	VectorZ,
	hasAngleVector = false,
	directionRight = false,
	color = '#b2c4d1',
}: TileProps) {
	const ref = useRef<Mesh>(null);
	const hasAngle = hasAngleVector;
	const isRight = directionRight;
	useEffect(() => {
		if (ref.current) {
			const meshPosition = getRealPositionFromGridPosition(gridPosition);
			ref.current.position.copy(meshPosition);
		}
	}, [gridPosition]);
	let rightAngleVector = null;
	if (hasAngle) {
		if (isRight) {
			rightAngleVector = new Vector3(0, 0, -TILE_SIZE / 2);
			VectorZ = new Vector3(0, VectorZ.y, 0);
		} else {
			rightAngleVector = new Vector3(0, 0, TILE_SIZE / 2);
			VectorZ = new Vector3(0, VectorZ.y, 0);
		}
	}

	return (
		<>
			<mesh
				ref={ref}
				onClick={() => {
					if (tileClickHandler) tileClickHandler({ gridPosition, VectorX, VectorZ, hasAngleVector, directionRight });
				}}>
				<Tube
					position={[0, 0.7, 0]}
					color="#3aaa35"
					vectors={[VectorX, VectorZ, rightAngleVector].filter(vector => vector != null) as Vector3[]}
				/>
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</>
	);
}
