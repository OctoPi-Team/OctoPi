import { RED } from '../../../AllColorVariables';
import { CubicBezierCurve3, CurvePath, SphereGeometry, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

type SphereProps = {
	// curve: CatmullRomCurve3;
	curve: CurvePath<Vector3>;
	vectorsForInputTube: Vector3[];
};

export default function Sphere({ curve, vectorsForInputTube }: SphereProps) {
	const name = 'sphere';
	const color: string = RED;
	const INPUTTUBEPOSSITION = GameSpec.tileSize * (GameSpec.sizeOfGameMatrix[1] - 1) + (GameSpec.sizeOfGameMatrix[1] - 1) * GameSpec.spacing;
	const [pos, updatepos] = useState<Vector3>(new Vector3(-15, 5, INPUTTUBEPOSSITION));
	const [time, ticktime] = useState(0);
	const [pointer, movepointr] = useState(0);
	const startingcurve = new CubicBezierCurve3(...vectorsForInputTube);
	const points: Vector3[] = startingcurve.getSpacedPoints(1000);

	points.reverse();
	points.push(...curve.getSpacedPoints(600));
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
