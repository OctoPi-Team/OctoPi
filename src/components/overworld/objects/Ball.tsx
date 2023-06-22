import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3, Mesh, MeshPhysicalMaterial, SphereGeometry } from 'three';
import { GREEN, RED, BLUE, PINK } from '../../../AllColorVariables';
import { useFrame } from '@react-three/fiber';

const COLORS = [GREEN, RED, BLUE, PINK];

type BallProps = {
	curve: CatmullRomCurve3;
};

function getRandomPosition(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function Ball({
	curve,
}: BallProps): JSX.Element {
	const ballRadius = 0.3;
	const [color, _] = useState(COLORS[Math.floor(getRandomPosition(0, COLORS.length - 1))]);
	const ballGeometry = new SphereGeometry(ballRadius, 32, 32);
	const ballMaterial = new MeshPhysicalMaterial({ color: color });
	const ballMesh = useRef<Mesh>(null);
	const [ballPosition, setBallPosition] = useState(getRandomPosition(1000, 100000));
	const ballSpeed = 1;

	useFrame(() => {
		if (ballMesh.current) {
			const tubePosition = curve.getPointAt(ballPosition % 1);
			if (ballMesh.current) {
				ballMesh.current.position.x = tubePosition.x;
				ballMesh.current.position.y = tubePosition.y;
				ballMesh.current.position.z = tubePosition.z;
			}
			setBallPosition(ballPosition + ballSpeed * 0.001);
		}
	});

	return <mesh geometry={ballGeometry} material={ballMaterial} ref={ballMesh} />;
}

export default Ball;