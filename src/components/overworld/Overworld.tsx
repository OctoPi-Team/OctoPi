import { Vector3, Color, BufferGeometry, Material, Mesh } from 'three';

import Player, { handleJoystickMove, handleJoystickStop, handleKeyDown, handleKeyUp } from './Player';
import Stair, { StairType } from './platforms/Stair';
import FixedCamera from './FixedCamera';
import SimplePlatform from './platforms/SimplePlatform';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import ShipmentPlatform from './platforms/ShipmentPlatform';
import Tube from './objects/Tube';

import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { SceneProps } from '../../App';
import { WHITE } from '../../AllColorVariables';
import { Joystick } from 'react-joystick-component';
import DesignPlatform from './platforms/DesignPlatform';
import MainPlatform from './platforms/MainPlatform';
import MonitoringPlatform from './platforms/MonitoringPlatform';
import PartsPlatform from './platforms/PartsPlatform';
import ProductionPlatform from './platforms/ProductionPlatform';
import EngineeringPlatform from './platforms/EngineeringPlatform';

type OverworldProps = {
	sceneProps: SceneProps;
	visible: boolean;
};

export default function Overworld({ sceneProps, visible }: OverworldProps) {
	const setSceneHook = sceneProps.setSceneHook;

	const ORBITAL_CONTROLS_ACTIVE = false;

	const [platforms, setPlatforms] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	const [stairs, setStairs] = useState<StairType[]>([]);
	const [buttons, setButtons] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);

	function addPlatform(newPlatform: Mesh<BufferGeometry, Material | Material[]>) {
		if (!platforms.includes(newPlatform)) setPlatforms(platforms => [...platforms, newPlatform]);
	}

	function addStair(newStair: StairType) {
		if (!platforms.includes(newStair.mesh)) {
			addPlatform(newStair.mesh);
			setStairs(stairs => [...stairs, newStair]);
		}
	}

	function addButtons(newButton: Mesh<BufferGeometry, Material | Material[]>) {
		if (!buttons.includes(newButton)) setButtons(button => [...button, newButton]);
	}

	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
				<div
					style={{
						position: 'absolute',
						zIndex: '50',
						right: '200px',
						bottom: '200px',
						visibility: visible ? 'hidden' : 'visible',
					}}>
					<Joystick
						baseColor="lightgreen"
						stickColor="darkgreen"
						size={100}
						move={handleJoystickMove}
						stop={handleJoystickStop}
					/>
				</div>
				{/* Default values for orthographic camera: near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]*/}
				<Canvas
					orthographic
					shadows
					camera={{ zoom: 40, position: [0, 0, 0] }}
					style={{ visibility: visible ? 'hidden' : 'visible' }}>
					{/* changes color of canvas from white to 'args'*/}
					<color attach="background" args={['white']} />
					<gridHelper args={[10, 10, 'black', 'white']} />
					{/* DirectionalLight can cast shadows if 'shadows' for Canvas and 'castShadow' for directionalLight is set,
					 meshes need 'castShadow' and/or 'receiveShadow'*/}
					<directionalLight
						position={[0.05, 1, -0.25]}
						intensity={0.8}
						shadow-mapSize-width={1000}
						shadow-mapSize-height={1000}
						shadow-camera-left={-500}
						shadow-camera-right={500}
						shadow-camera-near={1}
						shadow-camera-far={1000}
						shadow-camera-top={500}
						shadow-camera-bottom={-500}
						castShadow
					/>
					<ambientLight intensity={0.2}></ambientLight>
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}
					<MainPlatform position={[0, 0, 0]} reference={addPlatform} />
					<Stair startPosition={new Vector3(8, 0, 6.5)} endPosition={new Vector3(8, 0, 11)} reference={addStair} />
					<ShipmentPlatform
						position={[9, 0, 20]}
						reference={addPlatform}
						sceneProps={{ setSceneHook }}
						buttonreference={addButtons}
					/>
					<Stair startPosition={new Vector3(-7, 0, 6)} endPosition={new Vector3(-7, 4, 11)} reference={addStair} />
					<EngineeringPlatform position={[-13, 4, 20]} reference={addPlatform} />
					<Stair startPosition={new Vector3(-9.5, 0, 0)} endPosition={new Vector3(-16.2, 2, 0)} reference={addStair} />
					<DesignPlatform position={[-25.2, 2, -2]} reference={addPlatform} />
					<Stair startPosition={new Vector3(-5, 0, -6)} endPosition={new Vector3(-5, 3, -16)} reference={addStair} />
					<ProductionPlatform position={[-10, 3, -22]} reference={addPlatform} />
					<Stair startPosition={new Vector3(6, 0, -6.5)} endPosition={new Vector3(6, -4, -11.5)} reference={addStair} />
					<PartsPlatform position={[16, -4, -20]} reference={addPlatform} />
					<Stair startPosition={new Vector3(9.5, 0, 0)} endPosition={new Vector3(18, 4.5, 0)} reference={addStair} />
					<MonitoringPlatform position={[25, 4.5, -3]} reference={addPlatform} />
					<Player
						startPosition={new Vector3(0, 0, 0)}
						platforms={platforms}
						stairs={stairs}
						buttons={buttons}
						sceneProps={{ setSceneHook }}
					/>
					<Tube name="Tube" position={[16, 2, 18]} size={[0.5, 8, 1]} rotation={[0, 0, 0]} />
					<Tube name="Tube" position={[10, 2, 18]} size={[0.5, 8, 1]} rotation={[0, 0, 0]} />
				</Canvas >
			</div >
		</>
	);
}
