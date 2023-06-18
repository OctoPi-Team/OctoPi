import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

import { BLUE, GREEN, PINK, SHIPMENT } from '../../../AllColorVariables';
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
	startVector: Vector3;
	endVector: Vector3;
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
	startVector,
	endVector,
	tileType,
	color = SHIPMENT,
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
			startVector = new Vector3(0, 0, -TILE_SIZE / 2);
			cubicbenziercontrol1 = new Vector3(0, 0, -TILE_SIZE / 12);
			cubicbenziercontrol2 = new Vector3(-TILE_SIZE / 12, 0, 0);
			endVector = new Vector3(-TILE_SIZE / 2, 0, 0);
			break;
		case TileType.AngleLeft:
			startVector = new Vector3(0, 0, TILE_SIZE / 2);
			cubicbenziercontrol1 = new Vector3(0, 0, TILE_SIZE / 12);
			cubicbenziercontrol2 = new Vector3(-TILE_SIZE / 12, 0, 0);
			endVector = new Vector3(-TILE_SIZE / 2, 0, 0);
			break;
		case TileType.StraightNormal:
			startVector = new Vector3(-TILE_SIZE / 2, 0, 0);
			cubicbenziercontrol1 = new Vector3(0, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, 0);
			endVector = new Vector3(TILE_SIZE / 2, 0, 0);
			break;
		case TileType.StraightInverted:
			startVector = new Vector3(0, 0, -TILE_SIZE / 2);
			cubicbenziercontrol1 = new Vector3(0, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, 0);
			endVector = new Vector3(0, 0, TILE_SIZE / 2);
			break;
		case TileType.AngleRightInverted:
			// Handle AngleRightInverson case
			startVector = new Vector3(TILE_SIZE / 2, 0, 0);
			cubicbenziercontrol1 = new Vector3(TILE_SIZE / 12, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, -TILE_SIZE / 12);
			endVector = new Vector3(0, 0, -TILE_SIZE / 2);

			break;
		case TileType.AngleLeftInverted:
			// Handle AngleLeftInverted case
			startVector = new Vector3(TILE_SIZE / 2, 0, 0);
			cubicbenziercontrol1 = new Vector3(TILE_SIZE / 12, 0, 0);
			cubicbenziercontrol2 = new Vector3(0, 0, TILE_SIZE / 12);
			endVector = new Vector3(0, 0, TILE_SIZE / 2);
			break;
		default:
			break;
	}

	return (
		<>
			<mesh
				receiveShadow
				castShadow
				ref={ref}
				onClick={() => {
					if (tileClickHandler)
						tileClickHandler({
							gridPosition: gridPosition,
							startVector: startVector,
							endVector: endVector,
							tileType: tileType,
						});
				}}>
				<Tube
					position={[0, 0.7, 0]}
					color={GREEN}
					vectors={[startVector, cubicbenziercontrol1, cubicbenziercontrol2, endVector]}
					render={render}
				/>
				<boxGeometry args={[TILE_SIZE, 0.5, TILE_SIZE]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</>
	);
}
