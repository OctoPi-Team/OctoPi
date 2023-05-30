import { Vector3, Color, BufferGeometry, Material, Mesh } from 'three';

import Player, { handleJoystickMove, handleJoystickStop, handleKeyDown, handleKeyUp } from './Player';
import Stair, { StairType } from './platforms/Stair';
import FixedCamera from './FixedCamera';
import SimplePlatform from './platforms/SimplePlatform';
import { OrbitControls } from '@react-three/drei';
import ShipmentPlatform from './platforms/ShipmentPlatform';
import Tube from './objects/Tube';

import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { SceneProps } from '../../App';
import { WHITE, GREEN, ENGINEERING, PRODUCTION, PARTS, MONITORING, DESIGN } from '../../AllColorVariables';
import { Joystick } from 'react-joystick-component';
import DesignPlatform from './platforms/DesignPlatform';
import MainPlatform from './platforms/MainPlatform';
import MonitoringPlatform from './platforms/MonitoringPlatform';
import PartsPlatform from './platforms/PartsPlatform';

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

				<Canvas orthographic camera={{ zoom: 40 }} style={{ visibility: visible ? 'hidden' : 'visible' }}>
					<directionalLight intensity={0.5} color={WHITE} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}
					<MainPlatform position={[0, 0, 0]} reference={addPlatform} />
					<Stair startPosition={new Vector3(6, 0, 6)} endPosition={new Vector3(6, 2, 9)} reference={addStair} />
					<ShipmentPlatform
						position={[8, 2, 18]}
						reference={addPlatform}
						sceneProps={{ setSceneHook }}
						buttonreference={addButtons}
					/>
					<Stair startPosition={new Vector3(-7, 0, 6)} endPosition={new Vector3(-7, 4, 11)} reference={addStair} />
					<SimplePlatform
						name="Engineering"
						position={[-13, 4, 20]}
						size={[15, 0.5, 18]}
						reference={addPlatform}
						color={new Color(0xdabdd65)}
					/>
					<Stair startPosition={new Vector3(-9.5, 0, 0)} endPosition={new Vector3(-13, 1, 0)} reference={addStair} />
					<DesignPlatform position={[-20, 1, -2]} reference={addPlatform} />
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
					<Player
						startPosition={new Vector3(0, 0, 0)}
						platforms={platforms}
						stairs={stairs}
						buttons={buttons}
						sceneProps={{ setSceneHook }}
					/>
					<Tube name="Tube" position={[16, 2, 18]} size={[0.5, 8, 1]} rotation={[0, 0, 0]} />
					<Tube name="Tube" position={[10, 2, 18]} size={[0.5, 8, 1]} rotation={[0, 0, 0]} />
				</Canvas>
			</div>
		</>
	);
}
