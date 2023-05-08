/* eslint-disable react/no-unknown-property */
import './styles.css';
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector3, OrthographicCamera } from 'three';
import Platform from './Platform';
import Player, { handleKeyDown, handleKeyUp } from './Player';
import CoordOrigin from './CoordOrigin';

function FixedCamera() {
	const { scene, camera } = useThree();
	const cameraRef = useRef<OrthographicCamera>(null);
	useFrame(() => {
		if (!scene || !cameraRef.current) return;
		const player = scene.getObjectByName('player');
		if (!player) return;
		const playerPosition = player.position;
		if (playerPosition) {
			camera.position.set(playerPosition.x - 5, playerPosition.y + 5, playerPosition.z - 5);
			camera.lookAt(playerPosition);
		}
	});
	return <orthographicCamera ref={cameraRef} />;
}

export default function App() {
	return (
		<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
			<Canvas>
				<FixedCamera />
				<Platform />
				<CoordOrigin />
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(1, 0.5, 1)} />
			</Canvas>
		</div>
	);
}
