import { GREEN } from '../../../AllColorVariables';
import { TileProps, TileType } from './Tile';
import { CubicBezierCurve3, DoubleSide, TubeGeometry, Vector3, CurvePath } from 'three';

import Sphere from './Sphere';
import { GameSpec } from './GameSpec';

type FinalTubeProps = {
	getRealPositionFromGridPosition: (gridPosition: [number, number]) => Vector3;
	victoryTileSequence: TileProps[];
	vectorsForInputTube: Vector3[];
};

export function FinalTube({
	victoryTileSequence,
	getRealPositionFromGridPosition,
	vectorsForInputTube,
}: FinalTubeProps) {
	function getRealCornerPositionFromGridPosition(gridPosition: [number, number], startVector: Vector3) {
		const result = getRealPositionFromGridPosition(gridPosition);
		result.add(new Vector3(startVector.x, 0.7, startVector.z));
		return result;
	}
	const name = 'Final Tube';
	const color: string = GREEN;
	const position = new Vector3(0, 0, 0);
	const list = Array.from(Object.values(victoryTileSequence));
	let startVector = new Vector3(0, 0, 0);
	let endVector = new Vector3(0, 0, 0);
	let cubicbenziercontrol1 = new Vector3(0, 0, 0);
	let cubicbenziercontrol2 = new Vector3(0, 0, 0);
	const fullCurve: CurvePath<Vector3> = new CurvePath();
	for (let i = 0; i < list.length; i++) {
		switch (list[i].tileType) {
			case TileType.AngleRight: {
				startVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -GameSpec.tileSize / 2)
				);
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -GameSpec.tileSize / 12)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-GameSpec.tileSize / 12, 0, 0)
				);
				endVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-GameSpec.tileSize / 2, 0, 0)
				);
				const curve1 = new CubicBezierCurve3(endVector, cubicbenziercontrol1, cubicbenziercontrol2, startVector);
				fullCurve.add(curve1);
				break;
			}
			case TileType.AngleLeft: {
				startVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, GameSpec.tileSize / 2)
				);
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, GameSpec.tileSize / 12)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-GameSpec.tileSize / 12, 0, 0)
				);
				endVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-GameSpec.tileSize / 2, 0, 0)
				);
				const curve2 = new CubicBezierCurve3(endVector, cubicbenziercontrol1, cubicbenziercontrol2, startVector);
				fullCurve.add(curve2);
				break;
			}
			case TileType.StraightNormal: {
				startVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(-GameSpec.tileSize / 2, 0, 0)
				);
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				endVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(GameSpec.tileSize / 2, 0, 0)
				);
				const curve3 = new CubicBezierCurve3(startVector, cubicbenziercontrol1, cubicbenziercontrol2, endVector);
				fullCurve.add(curve3);
				break;
			}
			case TileType.StraightInverted: {
				startVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -GameSpec.tileSize / 2)
				);
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(list[i].gridPosition, new Vector3(0, 0, 0));
				endVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, GameSpec.tileSize / 2)
				);
				const curve4 = new CubicBezierCurve3(endVector, cubicbenziercontrol1, cubicbenziercontrol2, startVector);
				fullCurve.add(curve4);
				break;
			}
			case TileType.AngleRightInverted: {
				// Handle AngleRightInverson case
				startVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(GameSpec.tileSize / 2, 0, 0)
				);
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(GameSpec.tileSize / 12, 0, 0)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -GameSpec.tileSize / 12)
				);
				endVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, -GameSpec.tileSize / 2)
				);
				const curve5 = new CubicBezierCurve3(endVector, cubicbenziercontrol1, cubicbenziercontrol2, startVector);
				fullCurve.add(curve5);
				break;
			}
			case TileType.AngleLeftInverted: {
				// Handle AngleLeftInverted case
				startVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(GameSpec.tileSize / 2, 0, 0)
				);
				cubicbenziercontrol1 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(GameSpec.tileSize / 12, 0, 0)
				);
				cubicbenziercontrol2 = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, GameSpec.tileSize / 12)
				);
				endVector = getRealCornerPositionFromGridPosition(
					list[i].gridPosition,
					new Vector3(0, 0, GameSpec.tileSize / 2)
				);
				const curve6 = new CubicBezierCurve3(endVector, cubicbenziercontrol1, cubicbenziercontrol2, startVector);
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
				<meshPhysicalMaterial
					color={color}
					transparent={true}
					depthWrite={false}
					opacity={0.5}
					roughness={0.2}
					thickness={0.5}
					side={DoubleSide}
				/>
				<Sphere curve={fullCurve} vectorsForInputTube={vectorsForInputTube} />
			</mesh>
		</>
	);
}

export default FinalTube;
