import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

import { BLUE, GREEN } from '../../../AllColorVariables';
import Tube from './Tube';

export enum TileType {
	AngleRight,
	AngleLeft,
	StraightNormal,
	StraightInverted,
	AngleRightInverted,
	AngleLeftInverted,
	empty,
}

export type TileProps = {
	gridPosition: [number, number];
	tileClickHandler?: (tileProps: TileProps) => void;
	Vector1: Vector3;
	Vector2: Vector3;
	tileType: TileType;
	color?: string;
	render?: boolean;
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
	Vector1,
	Vector2,
	tileType,
	color = BLUE,
	render = true,
}: TileProps) {
	const ref = useRef<Mesh>(null);

	useEffect(() => {
		if (ref.current) {
			const meshPosition = getRealPositionFromGridPosition(gridPosition);
			ref.current.position.copy(meshPosition);
		}
	}, [gridPosition]);

	let cubicbenziercontrol1: Vector3 = new Vector3(0, 0, 0);
	let cubicbenziercontrol2: Vector3 = new Vector3(0, 0, 0);

	switch (tileType) {
		case TileType.AngleRight:
			Vector1 = new Vector3(0, 0, -TILE_SIZE / 2);
			cubicbenziercontrol1 = new Vector3(0, 0, -TILE_SIZE / 12);
			cubicbenziercontrol2 = new Vector3(-TILE_SIZE / 12, 0, 0);
			Vector2 = new Vector3(-TILE_SIZE / 2, 0, 0);
			break;
		case TileType.AngleLeft:
			Vector1 = new Vector3(0, 0, TILE_SIZE / 2);
			cubicbenziercontrol1 = new Vector3(0, 0, TILE_SIZE / 12);
			cubicbenziercontrol2 = new Vector3(-TILE_SIZE / 12, 0, 0);
			Vector2 = new Vector3(-TILE_SIZE / 2, 0, 0);
			break;
		case TileType.StraightNormal:
			Vector1 = new Vector3(-TILE_SIZE / 2, 0, 0);
			cubicbenziercontrol1 = new Vector3(0, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, 0);
			Vector2 = new Vector3(TILE_SIZE / 2, 0, 0);
			break;
		case TileType.StraightInverted:
			Vector1 = new Vector3(0, 0, -TILE_SIZE / 2);
			cubicbenziercontrol1 = new Vector3(0, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, 0);
			Vector2 = new Vector3(0, 0, TILE_SIZE / 2);
			break;
		case TileType.AngleRightInverted:
			// Handle AngleRightInverson case
			Vector1 = new Vector3(TILE_SIZE / 2, 0, 0);
			cubicbenziercontrol1 = new Vector3(TILE_SIZE / 12, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, -TILE_SIZE / 12);
			Vector2 = new Vector3(0, 0, -TILE_SIZE / 2);

			break;
		case TileType.AngleLeftInverted:
			// Handle AngleLeftInverted case
			Vector1 = new Vector3(TILE_SIZE / 2, 0, 0);
			cubicbenziercontrol1 = new Vector3(TILE_SIZE / 12, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, TILE_SIZE / 12);
			Vector2 = new Vector3(0, 0, TILE_SIZE / 2);
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
					vectors={[Vector1, cubicbenziercontrol1, cubicbenziercontrol2, Vector2]}
					detailed={true}
					render={render}
				/>
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</>
	);
}
