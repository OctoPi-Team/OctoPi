import {
	Vector3,
	BufferGeometry,
	Material,
	Mesh,
	Box3,
	DirectionalLight,
	OrthographicCamera,
	DirectionalLightHelper,
} from 'three';

import Player, { handleJoystickMove, handleJoystickStop, handleKeyDown, handleKeyUp } from './Player';
import Stair, { StairType } from './platforms/Stair';
import FixedCamera from './FixedCamera';
import { OrbitControls, useHelper } from '@react-three/drei';
import ShipmentPlatform from './platforms/ShipmentPlatform';
import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { SceneProps } from '../../App';
import { Joystick } from 'react-joystick-component';
import DesignPlatform from './platforms/DesignPlatform';
import MainPlatform from './platforms/MainPlatform';
import MonitoringPlatform from './platforms/MonitoringPlatform';
import PartsPlatform from './platforms/PartsPlatform';
import ProductionPlatform from './platforms/ProductionPlatform';
import EngineeringPlatform from './platforms/EngineeringPlatform';
import Floor from './platforms/Floor';
import NavigationButton from './objects/NavigationButton';

export default function Overworld({ setSceneHook, visible, playerPos = new Vector3() }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;

	const [platforms, setPlatforms] = useState<Box3[]>([]);
	const [stairs, setStairs] = useState<StairType[]>([]);
	const [buttons, setButtons] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	const [collisionBoxes, setCollisionBoxes] = useState<Box3[]>([]);

	const CAM_WIDTH = 80;
	const CAM_HEIGHT = 80;

	function addPlatform(newPlatform: Box3) {
		// these platforms are used to detect player collsion iwth the edge of the platform
		// they are used to make the player stay on the platform
		// the detailed collsion is described and implemented in the Player.tsx
		if (!platforms.includes(newPlatform)) {
			setPlatforms(platforms => [...platforms, newPlatform]);
		}
	}

	function addCollisionBox(newCollisionBox: Box3) {
		// these collision boxes are used to make the player collide with the objects on the platforms
		// the detailed collsion is described and implemented in the Player.tsx
		if (!collisionBoxes.includes(newCollisionBox)) {
			setCollisionBoxes(collisionBoxes => [...collisionBoxes, newCollisionBox]);
		}
	}

	function addStair(newStair: StairType) {
		// the mesh from these is used as a platform (addPlatform)
		// the start and end position of the stairtype are used to calculate the playerheight when
		// he moves on the staircases
		// the detailed description and implementation can be found in the Player.tsx
		if (!platforms.includes(newStair.mesh)) {
			addPlatform(newStair.mesh);
			setStairs(stairs => [...stairs, newStair]);
		}
	}

	function addButtons(newButton: Mesh<BufferGeometry, Material | Material[]>) {
		if (!buttons.includes(newButton)) setButtons(button => [...button, newButton]);
	}

	function DirLight() {
		const dirLight = useRef<DirectionalLight>(null);
		const SHOW_LIGHT_SOURCE = false;
		if (SHOW_LIGHT_SOURCE) {
			const mutableDirLightRef = dirLight as React.MutableRefObject<DirectionalLight>;
			useHelper(mutableDirLightRef, DirectionalLightHelper, 3, 0xff0000);
		}
		return (
			<>
				<directionalLight
					position={[-5, 20, -15]}
					ref={dirLight}
					shadow-mapSize={[1024, 1024]}
					intensity={0.7}
					castShadow>
					<orthographicCamera
						attach="shadow-camera"
						position={[-8, 20, -15]}
						args={[CAM_WIDTH / -2, CAM_WIDTH / 2, CAM_HEIGHT / 2, CAM_HEIGHT / -2]}
						near={0.1}
						far={300}
					/>
				</directionalLight>
				{dirLight.current && <primitive object={dirLight.current.shadow.camera as OrthographicCamera} />}
			</>
		);
	}
	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
				{!visible && (
					<>
						<div style={{ position: 'absolute', zIndex: '50', right: '200px', bottom: '200px' }}>
							<Joystick
								baseColor="lightgreen"
								stickColor="darkgreen"
								size={100}
								move={handleJoystickMove}
								stop={handleJoystickStop}
							/>
						</div>
						<NavigationButton
							position="absolute"
							right="30px"
							top="50px"
							text="i"
							onClick={() => {
								window.alert(
									'Willkommen zu unserem Spiel Operation:Innovation! Schaue dich mal auf den verschiedenen Platformen um, siehst du einen Button auf dem Boden? Geh ruhig mal hin.'
								);
							}}
						/>
						<NavigationButton
							position="absolute"
							right="75px"
							top="50px"
							text={'\u21BB'}
							onClick={() => {
								location.reload();
								setTimeout(() => {
									location.reload();
								}, 50);
							}}
						/>
					</>
				)}
				<Canvas orthographic shadows style={{ visibility: visible ? 'hidden' : 'visible' }}>
					<group name="lighting-and-camera">
						<color attach="background" args={['white']} />
						<DirLight />
						<ambientLight intensity={0.3}></ambientLight>
						<Floor position={[0, -3, 0]} />
						{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
						{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} visibility={visible} />}
					</group>
					<group name="platforms-and-stairs">
						<MainPlatform position={[0, 0, 0]} reference={addPlatform} addCollisionBox={addCollisionBox} />
						<Stair startPosition={new Vector3(8, 0, 6.5)} endPosition={new Vector3(8, 4, 16)} reference={addStair} />
						<ShipmentPlatform
							position={[9, 4, 25]}
							reference={addPlatform}
							sceneProps={{ setSceneHook }}
							buttonreference={addButtons}
							addCollisionBox={addCollisionBox}
						/>
						<Stair startPosition={new Vector3(-7, 0, 6.5)} endPosition={new Vector3(-7, 4, 13)} reference={addStair} />
						<EngineeringPlatform position={[-13, 4, 22]} reference={addPlatform} addCollisionBox={addCollisionBox} />
						<Stair startPosition={new Vector3(-10, 0, 0)} endPosition={new Vector3(-16.2, 2, 0)} reference={addStair} />
						<DesignPlatform position={[-25.2, 2, -2]} reference={addPlatform} addCollisionBox={addCollisionBox} />
						<Stair
							startPosition={new Vector3(-6.9, 0, -6.5)}
							endPosition={new Vector3(-7, 3, -16)}
							reference={addStair}
						/>
						<ProductionPlatform position={[-10, 3, -22]} reference={addPlatform} addCollisionBox={addCollisionBox} />
						<Stair startPosition={new Vector3(6, 0, -6.5)} endPosition={new Vector3(6, 1, -16)} reference={addStair} />
						<PartsPlatform position={[15, 1, -25]} reference={addPlatform} addCollisionBox={addCollisionBox} />
						<Stair startPosition={new Vector3(10, 0, 0)} endPosition={new Vector3(18, 4.5, 0)} reference={addStair} />
						<MonitoringPlatform position={[25, 4.5, -3]} reference={addPlatform} addCollisionBox={addCollisionBox} />
					</group>

					<Player
						startPosition={playerPos}
						platforms={platforms}
						stairs={stairs}
						buttons={buttons}
						sceneProps={{ setSceneHook }}
						collisionObjects={collisionBoxes}
					/>
				</Canvas>
			</div>
		</>
	);
}
