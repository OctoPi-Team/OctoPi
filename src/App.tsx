/* eslint-disable react/no-unknown-property */
import './styles.css';
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector3, PerspectiveCamera } from 'three';
import Platform from './Platform';
import Player, { handleKeyDown, handleKeyUp } from './Player';
import CoordOrigin from './CoordOrigin';
import Stair from './Stair';

function FixedCamera() {
	const { scene, camera } = useThree();
	const cameraRef = useRef<PerspectiveCamera>(null);
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
	return <perspectiveCamera ref={cameraRef} />;
}

export default function App() {
	return (
		<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
			<Canvas>
				<Stair startPosition={new Vector3(2, 0.5, 12)} orientation={[-Math.PI / 23, 0, 0]} length={7.5} />
				<Stair
					startPosition={new Vector3(7.5, 1.3, 23)}
					orientation={[-Math.PI / 2, Math.PI / 2.5, Math.PI / 2]}
					length={3}
				/>
				<FixedCamera />
				<Platform />
				<CoordOrigin />
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(1, 0.5, 1)} />
			</Canvas>
		</div>
	);
}
