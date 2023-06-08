import { BLACK, RED, WHITE } from '../../../AllColorVariables';
import { CatmullRomCurve3, CurvePath, Points, SphereGeometry, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { SPACING, TILE_SIZE } from './ShipmentGame';

type SphereProps = {
	// curv: CatmullRomCurve3;
	curv: CurvePath<Vector3>;
};
export default function Sphere({ curv }: SphereProps) {
	const name: string = 'sphere';
	const color: any = RED;

	const [pos, updatepos] = useState<Vector3>(new Vector3(0, 0, 9.6));
	const [timer, ticktime] = useState(0);
	const INPUTTUBEPOSSITION = TILE_SIZE * TILE_SIZE + TILE_SIZE * SPACING;
	const VECTORS_FOR_TUBE = [
		new Vector3(-1.9, -1.3 + 2, INPUTTUBEPOSSITION),
		new Vector3(-3, -1.2 + 2, INPUTTUBEPOSSITION),
		new Vector3(-3.5, 2 + 2, INPUTTUBEPOSSITION),
		new Vector3(-20, 1.5 + 2, INPUTTUBEPOSSITION),
	];

	let startingcurve = new CatmullRomCurve3(VECTORS_FOR_TUBE, false, 'centripetal', 20);
	let points: Vector3[] = startingcurve.getSpacedPoints(1000);
	points.reverse();
	points.push(...curv.getSpacedPoints(1000));
	const sphereGeometry = new SphereGeometry(0.3, 70, 20);

	useFrame(({ clock }) => {
		let a = clock.getElapsedTime();
		a = Math.round(a * 400);
		ticktime(time => a % points.length);
		updatepos(pos => points[timer]);
		if (timer >= points.length) {
			ticktime(time => 0);
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
