
import { BLACK, RED, WHITE } from '../../../AllColorVariables';
import { CatmullRomCurve3, Clock, CubicBezierCurve3, CurvePath, Points, SphereGeometry, Vector3 } from 'three';
import { getRootState, useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { SIZE_OF_GAME_MATRIX, SPACING, TILE_SIZE } from './ShipmentGame';

type SphereProps = {
	// curv: CatmullRomCurve3;
	curv: CurvePath<Vector3>;
};
export default function Sphere({ curv }: SphereProps) {
	const name: string = 'sphere';
	const color: any = RED;
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
	let startingcurve = new CubicBezierCurve3(
		VECTORS_FOR_TUBE[0],
		VECTORS_FOR_TUBE[1],
		VECTORS_FOR_TUBE[2],
		VECTORS_FOR_TUBE[3]
	);
	let points: Vector3[] = startingcurve.getSpacedPoints(1000);

	points.reverse();
	points.push(...curv.getSpacedPoints(600));
	const sphereGeometry = new SphereGeometry(0.3, 70, 20);
	useFrame(({ clock }) => {
		let a = clock.getElapsedTime();
		a = Math.round(a * 1000);
		if (a > time) {
			ticktime(time => a);
			movepointr(pointer => pointer + 7);
		}
		updatepos(pos => points[pointer]);
		if (pointer >= points.length) {
			movepointr(pointer => 0);
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
