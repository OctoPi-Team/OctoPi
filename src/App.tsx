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
import ShipmentPlatform from './ShipmentPlatform';
import Tube from './scene_objects/Tube';
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
				<Stair startPosition={new Vector3(6, 0, 6)} endPosition={new Vector3(6, 2, 9)} reference={addStair} />
				<ShipmentPlatform position={[8, 2, 18]} reference={addPlatform} />
				<Stair startPosition={new Vector3(-7, 0, 6)} endPosition={new Vector3(-7, 4, 11)} reference={addStair} />
				<SimplePlatform
					name="Engineering"
					position={[-13, 4, 20]}
					size={[15, 0.5, 18]}
					reference={addPlatform}
					color={new Color(0xdabdd65)}
				/>
				<Stair startPosition={new Vector3(-9.5, 0, 0)} endPosition={new Vector3(-13, 1, 0)} reference={addStair} />
				<SimplePlatform
					name="Design"
					position={[-20, 1, -2]}
					size={[14, 0.5, 17]}
					reference={addPlatform}
					color={new Color(0xdaf0ee)}
				/>
				<Stair startPosition={new Vector3(-5, 0, -6)} endPosition={new Vector3(-5, 3, -16)} reference={addStair} />
				<SimplePlatform
					name="Production"
					position={[-10, 3, -22]}
					size={[19, 0.5, 12]}
					reference={addPlatform}
					color={new Color(0x587b7f)}
				/>
				<Stair startPosition={new Vector3(6, 0, -6)} endPosition={new Vector3(6, 1.5, -11)} reference={addStair} />
				<SimplePlatform
					name="Parts"
					position={[10, 1.5, -20]}
					size={[13, 0.5, 18]}
					reference={addPlatform}
					color={new Color(0x686868)}
				/>
				<Stair startPosition={new Vector3(9.5, 0, 0)} endPosition={new Vector3(18, 4.5, 0)} reference={addStair} />
				<SimplePlatform
					name="Monitoring"
					position={[25, 4.5, -1]}
					size={[14, 0.5, 19]}
					reference={addPlatform}
					color={new Color(0xdddddd)}
				/>
				<ambientLight intensity={0.5} />
				<Player startPosition={new Vector3(0, 0, 0)} platforms={platforms} stairs={stairs} />
				<Tube name="Tube" position={[16, 2, 18]} size={[0.5, 8, 1]} rotation={0} />
				<Tube name="Tube" position={[10, 2, 18]} size={[0.5, 8, 1]} rotation={0} />
			</Canvas>
		</div>
	);
}
