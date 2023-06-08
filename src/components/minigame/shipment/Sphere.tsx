import { BLACK, RED, WHITE } from '../../../AllColorVariables';
import { CatmullRomCurve3, Points, SphereGeometry, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import { SPACING } from './ShipmentGame';

type SphereProps = {
	// curv: CatmullRomCurve3;
	curv: Vector3[];
};
export default function Sphere({ curv }: SphereProps) {
	const name: string = 'sphere';
	const color: any = RED;
	//const curve: CatmullRomCurve3 = curv;

	const [pos, updatepos] = useState<Vector3>(new Vector3(0, 0, 9.6));
	const [timer, ticktime] = useState(0);
	//	let points: Vector3[] = curve.getPoints(30);
	let points: Vector3[] = curv;
	let count = 0;

	const sphereGeometry = new SphereGeometry(0.3, 70, 20);

	useFrame(({ clock }) => {
		let a = clock.getElapsedTime();
		a = Math.round(a * 800);
		ticktime(time => a % points.length);
		updatepos(pos => points[timer]);
		// console.log(points[timer]);
		// console.log(timer);
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
