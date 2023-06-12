import { Vector3, BufferGeometry, Material, Mesh, Box3, DirectionalLight, OrthographicCamera, Scene } from 'three';

import Player, { handleJoystickMove, handleJoystickStop, handleKeyDown, handleKeyUp } from './Player';
import Stair, { StairType } from './platforms/Stair';
import FixedCamera from './FixedCamera';
import { OrbitControls } from '@react-three/drei';
import ShipmentPlatform from './platforms/ShipmentPlatform';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
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
import { LoadingScreen } from '../startscreen/LoadingScreen';

type OverworldProps = {
	sceneProps: SceneProps;
	visible: boolean;
};

export default function Overworld({ sceneProps, visible }: OverworldProps) {
	const setSceneHook = sceneProps.setSceneHook;

	const ORBITAL_CONTROLS_ACTIVE = false;

	const [platforms, setPlatforms] = useState<Box3[]>([]);
	const [stairs, setStairs] = useState<StairType[]>([]);
	const [buttons, setButtons] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	const [collisionBoxes, setCollisionBoxes] = useState<Box3[]>([]);

	const CAM_WIDTH = 80;
	const CAM_HEIGHT = 80;

	function addPlatform(newPlatform: Box3) {
		if (!platforms.includes(newPlatform)) setPlatforms(platforms => [...platforms, newPlatform]);
	}

	function addCollisionBox(newCollisionBox: Box3) {
		if (!collisionBoxes.includes(newCollisionBox)) {
			setCollisionBoxes(collisionBoxes => [...collisionBoxes, newCollisionBox]);
		}
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

	function DirLight() {
		const dirLight = useRef<DirectionalLight>(null);
		// const mutableDirLightRef = dirLight as React.MutableRefObject<DirectionalLight>;
		/* Shows the position of the light source*/
		//useHelper(mutableDirLightRef, DirectionalLightHelper, 3, 0xff0000);

		return (
			<>
				<directionalLight
					position={[-5, 20, -15]}
					ref={dirLight}
					shadow-mapSize={[1024, 1024]}
					intensity={0.7}
					castShadow
				>

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
					<div style={{ position: 'absolute', zIndex: '50', right: '200px', bottom: '200px' }}>
						<Joystick
							baseColor="lightgreen"
							stickColor="darkgreen"
							size={100}
							move={handleJoystickMove}
							stop={handleJoystickStop}
						/>
					</div>
				)}
				{!visible &&
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
			}			
			{!visible &&
			<NavigationButton
				position="absolute"
				right="75px"
				top="50px"
				text={'\u21BB'}
				onClick={() => {
					location.reload()
					setTimeout(() => {
						location.reload()
					}, 50);
				}}
			/>}
				<Canvas
					orthographic
					shadows
					camera={{
						zoom: 4,
						position: [-100, 100, -100],
						left: CAM_WIDTH / -2,
						right: CAM_WIDTH / 2,
						top: CAM_HEIGHT / 2,
						bottom: CAM_HEIGHT / -2,
						near: 0.1,
						far: 300,
					}}
					style={{ visibility: visible ? 'hidden' : 'visible' }}>
					{/*set zoom very low, to force preloading of all textures*/}
					<color attach="background" args={['white']} />
					<DirLight />
					<ambientLight intensity={0.3}></ambientLight>
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} visibility={visible} />}
					<MainPlatform position={[0, 0, 0]} reference={addPlatform} addCollisionBox={addCollisionBox} />
					<Floor position={[0, -3, 0]} />
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
					<Player
						startPosition={new Vector3(0, -0.3, 0)}
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
