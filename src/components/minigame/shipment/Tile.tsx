import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

import Tube from '../../overworld/objects/Tube';
import { BLUE, GREEN } from '../../../AllColorVariables';

export enum TileType {
	AngleRight,
	AngleLeft,
	StraightNormal,
	StraightInverted,
	AngleRightInverted,
	AngleLeftInverted,
}

export type TileProps = {
	gridPosition: [number, number];
	tileClickHandler?: (tileProps: TileProps) => void;
	Vector1: Vector3;
	Vector2: Vector3;
	tileType: TileType;
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

export default function Tile({ gridPosition, tileClickHandler, Vector1, Vector2, tileType, color = BLUE }: TileProps) {
	const ref = useRef<Mesh>(null);

	useEffect(() => {
		if (ref.current) {
			const meshPosition = getRealPositionFromGridPosition(gridPosition);
			ref.current.position.copy(meshPosition);
		}
	}, [gridPosition]);

	let rightAngleVector: Vector3 | null = null;

	switch (tileType) {
		case TileType.AngleRight:
			rightAngleVector = new Vector3(0, 0, -TILE_SIZE / 2);
			Vector2 = new Vector3(0, Vector2.y, 0);
			break;
		case TileType.AngleLeft:
			rightAngleVector = new Vector3(0, 0, TILE_SIZE / 2);
			Vector2 = new Vector3(0, Vector2.y, 0);
			break;
		case TileType.StraightNormal:
			break;
		case TileType.StraightInverted:
			Vector1 = new Vector3(0, Vector1.y, -TILE_SIZE / 2);
			Vector2 = new Vector3(0, Vector2.y, TILE_SIZE / 2);
			break;
		case TileType.AngleRightInverted:
			// Handle AngleRightInverson case
			Vector1 = new Vector3(TILE_SIZE / 2, Vector1.y, 0);
			rightAngleVector = new Vector3(0, 0, -TILE_SIZE / 2);
			Vector2 = new Vector3(0, Vector2.y, 0);
			break;
		case TileType.AngleLeftInverted:
			// Handle AngleLeftInverted case
			Vector1 = new Vector3(TILE_SIZE / 2, Vector1.y, 0);
			rightAngleVector = new Vector3(0, 0, TILE_SIZE / 2);
			Vector2 = new Vector3(0, Vector2.y, 0);
			break;
		default:
			break;
	}

	return (
		<>
			<mesh
				ref={ref}
				onClick={() => {
					if (tileClickHandler)
						tileClickHandler({
							gridPosition,
							Vector1,
							Vector2,
							tileType,
						});
				}}>
				<Tube
					position={[0, 0.7, 0]}
					color={GREEN}
					vectors={[Vector1, Vector2, rightAngleVector].filter(vector => vector != null) as Vector3[]}
					detailed={true}
				/>
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</>
	);
}
