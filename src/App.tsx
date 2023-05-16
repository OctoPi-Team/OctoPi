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
import ShipmentPlatform from './ShipmentObjects';
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
			<Canvas orthographic camera={{ zoom: 40 }} style={{ visibility: visible ? 'hidden' : 'visible' }}>
				<directionalLight intensity={0.5} color={'white'} />
				{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
				{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}
				<SimplePlatform position={[0, 0, 0]} size={[20, 0.5, 13]} reference={addPlatform} color={new Color(0x3aaa35)} />
				<SimplePlatform
					name="Engineering"
					position={[-13, 4, 20]}
					size={[15, 0.5, 18]}
					reference={addPlatform}
					color={new Color(0xdabdd65)}
				/>
				<SimplePlatform
					name="Design"
					position={[-20, 1, -2]}
					size={[14, 0.5, 17]}
					reference={addPlatform}
					color={new Color(0xdaf0ee)}
				/>
				<SimplePlatform
					name="Production"
					position={[-10, 2.5, -22]}
					size={[19, 0.5, 12]}
					reference={addPlatform}
					color={new Color(0x587b7f)}
				/>
				<SimplePlatform
					name="Parts"
					position={[10, 1.5, -20]}
					size={[13, 0.5, 18]}
					reference={addPlatform}
					color={new Color(0x686868)}
				/>
				<SimplePlatform
					name="Monitoring"
					position={[25, 4.5, -1]}
					size={[14, 0.5, 19]}
					reference={addPlatform}
					color={new Color(0xdddddd)}
				/>
				<ShipmentPlatform position={[8, 2, 20]} reference={addPlatform} />
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(0, 0, 0)} platforms={platforms} stairs={stairs} />
			</Canvas>
		</div>
	);
}
