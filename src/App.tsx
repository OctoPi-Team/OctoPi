import './index.css';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3, Mesh, BufferGeometry, Material, Color } from 'three';
import Player, { handleKeyDown, handleKeyUp } from './components/overworld/Player';
import Stair, { StairType } from './components/overworld/platforms/Stair';
import Video from './components/startscreen/Video';
import FixedCamera from './components/overworld/FixedCamera';
import SimplePlatform from './components/overworld/platforms/SimplePlatform';
import { OrbitControls } from '@react-three/drei';
import ShipmentPlatform from './components/overworld/platforms/ShipmentPlatform';
import Tube from './components/overworld/objects/Tube';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import MainPlatform from './components/overworld/platforms/MainPlatform';
import PartsPlatform from './components/overworld/platforms/PartsPlatform';
import MonitoringPlatform from './components/overworld/platforms/MonitoringPlatform';
import DesignPlatform from './components/overworld/platforms/DesignPlatform';

export default function App() {
	const ORBITAL_CONTROLS_ACTIVE = false;
	const [visible, setVisible] = useState(true);

	const [platforms, setPlatforms] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	const [stairs, setStairs] = useState<StairType[]>([]);

	function addPlatform(newPlatform: Mesh<BufferGeometry, Material | Material[]>) {
		if (!platforms.includes(newPlatform)) setPlatforms([...platforms, newPlatform]);
	}

	function addStair(newStair: StairType) {
		if (!platforms.includes(newStair.mesh)) {
			addPlatform(newStair.mesh);
			setStairs([...stairs, newStair]);
		}
	}

	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
				{visible && <Video setVisible={setVisible} />}

				<Canvas orthographic camera={{ zoom: 40 }} style={{ visibility: visible ? 'hidden' : 'visible' }}>
					<directionalLight intensity={0.5} color={'white'} />

					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}

					<MainPlatform position={[0, 0, 0]}reference={addPlatform}/>
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
					<DesignPlatform position={[-20, 0.5, -2]} reference={addPlatform} />
					<Stair startPosition={new Vector3(-5, 0, -6)} endPosition={new Vector3(-5, 3, -16)} reference={addStair} />
					<SimplePlatform
						name="Production"
						position={[-10, 3, -22]}
						size={[19, 0.5, 12]}
						reference={addPlatform}
						color={new Color(0x587b7f)}
					/>
					<Stair startPosition={new Vector3(6, 0, -6)} endPosition={new Vector3(6, 1.5, -11)} reference={addStair} />
					<PartsPlatform position={[10, 1.5, -20]} reference={addPlatform} />
					<Stair startPosition={new Vector3(9.5, 0, 0)} endPosition={new Vector3(18, 4.5, 0)} reference={addStair} />
					<MonitoringPlatform position={[25, 4.5, -1]} reference={addPlatform} />
					<ambientLight intensity={0.5} />
					<Player startPosition={new Vector3(0, 0, 0)} platforms={platforms} stairs={stairs} />
					<Tube name="Tube" position={[16, 2, 18]} size={[0.5, 8, 1]} rotation={[0, 0, 0]} />
					<Tube name="Tube" position={[10, 2, 18]} size={[0.5, 8, 1]} rotation={[0, 0, 0]} />
				</Canvas>
			</div>
		</>
	);
}
