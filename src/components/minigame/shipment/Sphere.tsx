import { RED } from '../../../AllColorVariables';
import { CubicBezierCurve3, CurvePath, SphereGeometry, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { SIZE_OF_GAME_MATRIX, SPACING, TILE_SIZE } from './ShipmentGame';

type SphereProps = {
	curv: CurvePath<Vector3>;
};

export default function Sphere({ curv }: SphereProps) {
	const name = 'sphere';
	const color: string = RED;
	const INPUTTUBEPOSSITION = TILE_SIZE * (SIZE_OF_GAME_MATRIX[1] - 1) + (SIZE_OF_GAME_MATRIX[1] - 1) * SPACING;
	const [pos, updatepos] = useState<Vector3>(new Vector3(-15, 5, INPUTTUBEPOSSITION));
	const [time, ticktime] = useState(0);
	const [pointer, movepointr] = useState(0);

	const VECTORS_FOR_TUBE = [
		new Vector3(-1.9 + 2 * SPACING, 0.7, INPUTTUBEPOSSITION),
		new Vector3(-15, 0.7, INPUTTUBEPOSSITION),
		new Vector3(-1.9 + SPACING, 5, INPUTTUBEPOSSITION),
		new Vector3(-15, 5, INPUTTUBEPOSSITION),
	];
	const startingcurve = new CubicBezierCurve3(...VECTORS_FOR_TUBE);
	const points: Vector3[] = startingcurve.getSpacedPoints(1000);

	points.reverse();
	points.push(...curv.getSpacedPoints(600));
	const sphereGeometry = new SphereGeometry(0.3, 70, 20);
	useFrame(({ clock }) => {
		const deltaTime = Math.round(clock.getElapsedTime() * 1000);
		if (deltaTime > time) {
			ticktime(() => deltaTime);
			movepointr(pointer => pointer + 7);
		}
		updatepos(() => points[pointer]);
		if (pointer >= points.length) {
			movepointr(() => 0);
		}
	});

	return (
		<>
			<mesh name={name} position={pos}>
				<primitive object={sphereGeometry} />
				<meshStandardMaterial color={color} />
			</mesh>
		</>
	);
}
