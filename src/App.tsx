/* eslint-disable react/no-unknown-property */
import './styles.css';

import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Vector3, PerspectiveCamera } from 'three';
import { OrbitControls, Stage } from '@react-three/drei';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import Platform from './Platform';
import Player, { handleKeyDown, handleKeyUp } from './Player';
import CoordOrigin from './CoordOrigin';
import Stair from './Stair';

function FixedCamera() {
	const { scene, camera } = useThree();
	const cameraRef = useRef<PerspectiveCamera>(null);
	useFrame(() => {
		const distance_from_player_to_camera = 5;
		if (!scene || !cameraRef.current) return;
		const player = scene.getObjectByName('player');
		if (!player) return;
		const playerPosition = player.position;
		if (playerPosition) {
			camera.position.set(
				playerPosition.x - distance_from_player_to_camera,
				playerPosition.y + distance_from_player_to_camera,
				playerPosition.z - distance_from_player_to_camera
			);
			camera.lookAt(playerPosition);
		}
	});
	return <perspectiveCamera ref={cameraRef} />;
}

function Stairs() {
	// staircase orientations and positions were found by trying different values
	return (
		<>
			<Stair startPosition={new Vector3(2, 0.5, 12)} orientation={[-Math.PI / 23, 0, 0]} length={7.5} />
			<Stair
				startPosition={new Vector3(7.5, 1.3, 23)}
				orientation={[-Math.PI / 2, Math.PI / 2.5, Math.PI / 2]}
				length={3}
			/>
		</>
	);
}

function Video({ setVisible }: any) {
	return (
		<React.Fragment>
			<video
				className="video"
				onEnded={() => {
					setVisible(false);
				}}
				height={window.innerHeight}
				width={window.innerWidth}
				preload="auto"
				autoPlay
				data-setup="{}">
				<source src="10.mp4" type="video/mp4"></source>
			</video>
		</React.Fragment>
	);
}

export default function App() {
	const [visible, setVisible] = useState(true);
	return (
		<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
			{visible && <Video setVisible={setVisible} />}
			<Canvas style={{ visibility: visible ? 'hidden' : 'visible' }}>
				<Stairs />
				<FixedCamera />
				<Platform />
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(1, 0.5, 1)} />
			</Canvas>
		</div>
	);
}
