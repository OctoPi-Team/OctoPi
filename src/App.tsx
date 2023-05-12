import './styles.css';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3, Mesh, BufferGeometry, Material } from 'three';
import Platform from './scene_objects/Platform';
import Player, { handleKeyDown, handleKeyUp } from './scene_objects/Player';
import Stair from './scene_objects/Stair';
import Video from './Video';
import FixedCamera from './scene_objects/FixedCamera';

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

export default function App() {
	const [visible, setVisible] = useState(true);

	const [platforms, setPlatforms] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	function addPlatform(newPlatform: Mesh<BufferGeometry, Material | Material[]>) {
		if (!platforms.includes(newPlatform)) setPlatforms([...platforms, newPlatform]);
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
			{visible && <Video setVisible={setVisible} />}
			<Canvas style={{ visibility: visible ? 'hidden' : 'visible' }}>
				<Stairs />
				<FixedCamera distance_from_player_to_camera={5} />
				<Platform addPlatformRef={addPlatform} />
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(1, 0.5, 1)} platforms={platforms} />
			</Canvas>
		</div>
	);
}
