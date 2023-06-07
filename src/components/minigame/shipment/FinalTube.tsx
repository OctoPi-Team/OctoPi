import { BLUE, WHITE } from '../../../AllColorVariables';
import { TileProps, TileType } from './Tile';
import { TILE_SIZE, SPACING, SIZE_OF_GAME_MATRIX } from './ShipmentGame';
import path from 'path';
import { CatmullRomCurve3, CubicBezierCurve3, DoubleSide, TubeGeometry, Vector3, SphereGeometry } from 'three';
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
	const color = BLUE;
	const position = new Vector3(0, 0, 0);
	const list = Array.from(Object.values(qwd));
	let points: Vector3[] = [];
	for (let i = 0; i < list.length; i++) {
		points.push(getRealCornerPositionFromGridPosition(list[i].gridPosition, list[i].Vector2));
		points.push(getRealCornerPositionFromGridPosition(list[i].gridPosition, list[i].Vector1));
	}
	console.log(points);
	let curv = new CatmullRomCurve3(points, false, 'centripetal', 20);
	let tubeGeometry = new TubeGeometry(curv, 100, 0.8, 100, false);
	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={tubeGeometry} />
				<meshStandardMaterial color={color} transparent opacity={0.2} side={DoubleSide} />
				<Sphere curv={curv} />
			</mesh>
		</>
	);
}

export default FinalTube;
