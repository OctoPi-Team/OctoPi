import './styles.css';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3, Mesh, BufferGeometry, Material, Color } from 'three';
import Player, { handleKeyDown, handleKeyUp } from './scene_objects/Player';
import Stair, { StairType } from './scene_objects/Stair';
import Video from './Video';
import FixedCamera from './scene_objects/FixedCamera';
import SimplePlatform from './scene_objects/SimeplPlatform';
import { OrbitControls } from '@react-three/drei';
import CoordOrigin from './scene_objects/CoordOrigin';

const ORBITAL_CONTROLS_ACTIVE = false;

export default function App() {
	const [visible, setVisible] = useState(true);

	const [platforms, setPlatforms] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	function addPlatform(newPlatform: Mesh<BufferGeometry, Material | Material[]>) {
		if (!platforms.includes(newPlatform)) setPlatforms([...platforms, newPlatform]);
	}

	const [stairs, setStairs] = useState<StairType[]>([]);
	function addStair(newStair: StairType) {
		if (!platforms.includes(newStair.mesh)) {
			addPlatform(newStair.mesh);
			setStairs([...stairs, newStair]);
		}
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
			{visible && <Video setVisible={setVisible} />}
			<Canvas style={{ visibility: visible ? 'hidden' : 'visible' }}>
				{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
				{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={5} />}
				<CoordOrigin position={new Vector3(2, 0, 5)} />
				<Stair startPosition={new Vector3(2, 0, 5)} endPosition={new Vector3(2, 1.5, 7)} reference={addStair} />
				<SimplePlatform position={[0, 0, 0]} size={[10, 0.5, 10]} reference={addPlatform} color={new Color("lightgreen")} />
				<SimplePlatform position={[6, 1.5, 12]} size={[10, 0.5, 10]} reference={addPlatform} color={new Color("yellow")} />

				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(0, 0, 0)} platforms={platforms} stairs={stairs} />
			</Canvas>
		</div>
	);
}			
