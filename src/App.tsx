import './styles.css';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3, Mesh, BufferGeometry, Material, Color } from 'three';
import Player, { handleKeyDown, handleKeyUp } from './scene_objects/Player';
import Stair, { StairType } from './scene_objects/Stair';
import Video from './Video';
import FixedCamera from './scene_objects/FixedCamera';
import SimplePlatform from './scene_objects/SimplePlatform';
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
				<directionalLight intensity={0.5} color={'white'} />
				{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
				{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={5} />}
				<CoordOrigin position={new Vector3(-6, 0, 5)} />
				<CoordOrigin position={new Vector3(-10, 0, -1)} />
				<CoordOrigin position={new Vector3(-4, 0, -5)} />
				<CoordOrigin position={new Vector3(8, 0, -5)} />
				<CoordOrigin position={new Vector3(10, 0, -1)} />
				<CoordOrigin position={new Vector3(6, 0, 5)} />

				<Stair startPosition={new Vector3(6, -0.2, 5)} endPosition={new Vector3(6, 1.5, 8)} reference={addStair} />
				<SimplePlatform position={[0, 0, 0]} size={[20, 0.5, 10]} reference={addPlatform} color={new Color(0x3aaa35)} />
				<SimplePlatform
					position={[-7, 1.5, 12]}
					size={[11, 0.5, 10]}
					reference={addPlatform}
					color={new Color(0xdabdd65)}
				/>
				<SimplePlatform
					position={[-15, 1.5, -2]}
					size={[8, 0.5, 7]}
					reference={addPlatform}
					color={new Color(0xdaf0ee)}
				/>
				<SimplePlatform
					position={[-7, 1.5, -14]}
					size={[14, 0.5, 10]}
					reference={addPlatform}
					color={new Color(0x587b7f)}
				/>
				<SimplePlatform
					position={[10, 1.5, -16]}
					size={[9, 0.5, 15]}
					reference={addPlatform}
					color={new Color(0x686868)}
				/>
				<SimplePlatform
					position={[22, 1.5, -1]}
					size={[12, 0.5, 13]}
					reference={addPlatform}
					color={new Color(0xdddddd)}
				/>
				<SimplePlatform
					position={[8, 1.5, 16]}
					size={[8, 0.5, 16]}
					reference={addPlatform}
					color={new Color(0xb2c4d1)}
				/>
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(0, 0, 0)} platforms={platforms} stairs={stairs} />
			</Canvas>
		</div>
	);
}
