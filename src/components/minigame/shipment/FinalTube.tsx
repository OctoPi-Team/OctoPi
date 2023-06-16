import { GREEN } from '../../../AllColorVariables';
import { TileProps, TileType } from './Tile';
import { TILE_SIZE, SPACING } from './ShipmentGame';
import { CubicBezierCurve3, DoubleSide, TubeGeometry, Vector3, CurvePath } from 'three';

import Sphere from './Sphere';

function getRealCornerPositionFromGridPosition(gridPosition: [number, number], Vector1: Vector3): Vector3 {
	return new Vector3(
		gridPosition[0] * SPACING + gridPosition[0] * TILE_SIZE + Vector1.x,
		0.7,
		gridPosition[1] * SPACING + gridPosition[1] * TILE_SIZE + Vector1.z
	);
}

export function FinalTube(qwd: TileProps[]) {
	const name = 'Final Tube';
	const color: string = GREEN;
	// const INPUTTUBEPOSSITION = TILE_SIZE * (SIZE_OF_GAME_MATRIX[1] - 1) + (SIZE_OF_GAME_MATRIX[1] - 1) * SPACING;
	const position = new Vector3(0, 0, 0);
	const list = Array.from(Object.values(qwd));
	let Vector1 = new Vector3(0, 0, 0);
	let Vector2 = new Vector3(0, 0, 0);
	let cubicbenziercontrol1 = new Vector3(0, 0, 0);
	let cubicbenziercontrol2 = new Vector3(0, 0, 0);
	const fullCurve: CurvePath<Vector3> = new CurvePath();
	for (let i = 0; i < list.length; i++) {
		switch (list[i].tileType) {
			case TileType.AngleRight: {
				Vector1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, -TILE_SIZE / 2));
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -TILE_SIZE / 12)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-TILE_SIZE / 12, 0, 0)
				);
				Vector2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(-TILE_SIZE / 2, 0, 0));
				const curve1 = new CubicBezierCurve3(Vector2, cubicbenziercontrol1, cubicbenziercontrol2, Vector1);
				fullCurve.add(curve1);
				break;
			}
			case TileType.AngleLeft: {
				Vector1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, TILE_SIZE / 2));
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, TILE_SIZE / 12)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-TILE_SIZE / 12, 0, 0)
				);
				Vector2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(-TILE_SIZE / 2, 0, 0));
				const curve2 = new CubicBezierCurve3(Vector2, cubicbenziercontrol1, cubicbenziercontrol2, Vector1);
				fullCurve.add(curve2);
				break;
			}
			case TileType.StraightNormal: {
				Vector1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(-TILE_SIZE / 2, 0, 0));
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				Vector2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(TILE_SIZE / 2, 0, 0));
				const curve3 = new CubicBezierCurve3(Vector1, cubicbenziercontrol1, cubicbenziercontrol2, Vector2);
				fullCurve.add(curve3);
				break;
			}
			case TileType.StraightInverted: {
				Vector1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, -TILE_SIZE / 2));
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				Vector2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, TILE_SIZE / 2));
				const curve4 = new CubicBezierCurve3(Vector2, cubicbenziercontrol1, cubicbenziercontrol2, Vector1);
				fullCurve.add(curve4);
				break;
			}
			case TileType.AngleRightInverted: {
				// Handle AngleRightInverson case
				Vector1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(TILE_SIZE / 2, 0, 0));
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(TILE_SIZE / 12, 0, 0)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -TILE_SIZE / 12)
				);
				Vector2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, -TILE_SIZE / 2));
				const curve5 = new CubicBezierCurve3(Vector2, cubicbenziercontrol1, cubicbenziercontrol2, Vector1);
				fullCurve.add(curve5);
				break;
			}
			case TileType.AngleLeftInverted: {
				// Handle AngleLeftInverted case
				Vector1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(TILE_SIZE / 2, 0, 0));
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(TILE_SIZE / 12, 0, 0)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, TILE_SIZE / 12)
				);
				Vector2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, TILE_SIZE / 2));
				const curve6 = new CubicBezierCurve3(Vector2, cubicbenziercontrol1, cubicbenziercontrol2, Vector1);
				fullCurve.add(curve6);
				break;
			}
			default:
				break;
		}
	}

	const tubeGeometry = new TubeGeometry(fullCurve, 50, 0.41, 50, false);

	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={tubeGeometry} />
				<meshStandardMaterial color={color} transparent opacity={0.65} side={DoubleSide} />
				<Sphere curve={fullCurve} />
			</mesh>
		</>
	);
}

export default FinalTube;
