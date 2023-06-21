import {
	Vector3,
	BufferGeometry,
	Material,
	Mesh,
	Box3,
	DirectionalLight,
	OrthographicCamera,
	DirectionalLightHelper,
	Vector2,
} from 'three';
import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { OrbitControls, useHelper } from '@react-three/drei';
import Player, { handleJoystickMove, handleJoystickStop, handleKeyDown, handleKeyUp } from './Player';
import Stair, { StairType } from './platforms/Stair';
import FixedCamera from '../FixedCamera';
import ShipmentPlatform from './platforms/ShipmentPlatform';
import { SceneProps } from '../../App';
import DesignPlatform from './platforms/DesignPlatform';
import MainPlatform from './platforms/MainPlatform';
import MonitoringPlatform from './platforms/MonitoringPlatform';
import PartsPlatform from './platforms/PartsPlatform';
import ProductionPlatform from './platforms/ProductionPlatform';
import EngineeringPlatform from './platforms/EngineeringPlatform';
import Floor from './platforms/Floor';
import NavigationButton from '../ui/NavigationButton';
import InfoButton from '../ui/InfoButton';
import DragVector from './DragVector';
import './style/onbuttonstep.css';
import AlreadyFixedInformation from '../ui/AlreadyFixedInformation';
import InfoForButton from '../ui/InfoForButton';
import AreYouSureReload from '../ui/AreYouSureReload';

export default function Overworld({
	setSceneHook,
	visible,
	playerPos = new Vector3(),
	setIsPlatformFixed,
	isPlatformFixed,
}: SceneProps) {
	const [platforms, setPlatforms] = useState<Box3[]>([]);
	const [stairs, setStairs] = useState<StairType[]>([]);
	const [buttons, setButtons] = useState<Mesh<BufferGeometry, Material | Material[]>[]>([]);
	const [collisionBoxes, setCollisionBoxes] = useState<Box3[]>([]);
	const [info, setInfo] = useState(false);
	const [buttonName, setButtonName] = useState('');
	const [isOnButton, setIsOnButton] = useState(false);
	const [areYouSureReload, setAreYouSureReload] = useState(false);

	const ORBITAL_CONTROLS_ACTIVE = false;
	const CAM_WIDTH = 80;
	const CAM_HEIGHT = 80;

	const { handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd } =
		DragVector(new Vector2(window.innerWidth / 2, window.innerHeight / 2), handleJoystickMove);

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
					castShadow={true}>
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
			<div
				style={{ width: '100vw', height: '100vh', visibility: visible ? 'visible' : 'hidden' }}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				tabIndex={0}>
				<>
					<div style={{ position: 'absolute', zIndex: '50', right: '200px', bottom: '200px' }}>
						<Joystick
							baseColor="lightgreen"
							stickColor="darkgreen"
							size={130}
							move={handleJoystickMove}
							stop={handleJoystickStop}
						/>
					</div>
					<NavigationButton
						position="absolute"
						right="30px"
						top="40px"
						text="i"
						onClick={() => {
							setInfo(true);
							if (info) {
								setInfo(false);
							}
							setTimeout(() => {
								setInfo(false);
							}, 10000);
						}}
					/>
					<NavigationButton
						position="absolute"
						right="100px"
						top="40px"
						text={'\u21BB'}
						onClick={() => {
							if (!areYouSureReload) {
								setAreYouSureReload(true);
							} else {
								setAreYouSureReload(false);
							}
						}}
					/>
				</>
				<Canvas
					orthographic
					shadows
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}>
					<group name="lighting-and-camera">
						<color attach="background" args={['white']} />
						<DirLight />
						<ambientLight intensity={0.3}></ambientLight>
						<Floor position={[0, -3, 0]} />
						{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
						{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} visibility={!visible} />}
					</group>
					<group name="platforms-and-stairs">
						<MainPlatform
							position={[0, 0, 0]}
							reference={addPlatform}
							addCollisionBox={addCollisionBox}
							buttonReference={addButtons}
						/>
						<Stair
							startPosition={new Vector3(7.5, 0, 6.5)}
							endPosition={new Vector3(7.5, 4, 16)}
							reference={addStair}
						/>
						<ShipmentPlatform
							position={[9, 4, 25]}
							reference={addPlatform}
							sceneProps={{ setSceneHook }}
							buttonReference={addButtons}
							addCollisionBox={addCollisionBox}
							isPlatformFixed={isPlatformFixed}
						/>
						<Stair
							startPosition={new Vector3(-7.5, 0, 6.5)}
							endPosition={new Vector3(-7.5, 4, 13)}
							reference={addStair}
						/>
						<EngineeringPlatform
							position={[-12.5, 4, 22]}
							reference={addPlatform}
							buttonReference={addButtons}
							addCollisionBox={addCollisionBox}
							isPlatformFixed={isPlatformFixed}
						/>
						<Stair startPosition={new Vector3(-10, 0, 0)} endPosition={new Vector3(-16.2, 2, 0)} reference={addStair} />
						<DesignPlatform
							position={[-25.2, 2, -2]}
							reference={addPlatform}
							buttonReference={addButtons}
							addCollisionBox={addCollisionBox}
							isPlatformFixed={isPlatformFixed}
						/>
						<Stair
							startPosition={new Vector3(-7, 0, -6.5)}
							endPosition={new Vector3(-7, 3, -16)}
							reference={addStair}
						/>
						<ProductionPlatform
							position={[-11, 3, -22]}
							reference={addPlatform}
							buttonReference={addButtons}
							addCollisionBox={addCollisionBox}
							isPlatformFixed={isPlatformFixed}
						/>
						<Stair startPosition={new Vector3(6, 0, -6.5)} endPosition={new Vector3(6, 1, -16)} reference={addStair} />
						<PartsPlatform
							position={[15, 1, -25]}
							reference={addPlatform}
							buttonReference={addButtons}
							addCollisionBox={addCollisionBox}
							isPlatformFixed={isPlatformFixed}
						/>
						<Stair startPosition={new Vector3(10, 0, 0)} endPosition={new Vector3(18, 4.5, 0)} reference={addStair} />
						<MonitoringPlatform
							position={[25, 4.5, -3]}
							reference={addPlatform}
							buttonReference={addButtons}
							addCollisionBox={addCollisionBox}
							isPlatformFixed={isPlatformFixed}
						/>
					</group>
					<Player
						startPosition={playerPos}
						platforms={platforms}
						stairs={stairs}
						buttons={buttons}
						sceneProps={{ setSceneHook }}
						collisionObjects={collisionBoxes}
						setButton={setButtonName}
						setIsOnButton={setIsOnButton}
						isOnButton={isOnButton}
						setIsPlatformFixed={setIsPlatformFixed}
						isPlatformFixed={isPlatformFixed}
					/>
				</Canvas>
				<InfoForButton buttonName={buttonName} isOnButton={isOnButton} />
				{info &&
					InfoButton(
						'Willkommen zu unserem Spiel Operation:Innovation! ' +
							'Schaue dich mal auf den verschiedenen Platformen um, siehst du ' +
							'einen Button auf dem Boden?\n' +
							'Geh ruhig mal hin.'
					)}
				{(isPlatformFixed?.monitoring ||
					isPlatformFixed?.parts ||
					isPlatformFixed?.design ||
					isPlatformFixed?.engineering ||
					isPlatformFixed?.shipment ||
					isPlatformFixed?.production) && <AlreadyFixedInformation isPlatformFixed={isPlatformFixed} />}
				{areYouSureReload && <AreYouSureReload setAreYouSureReload={setAreYouSureReload} />}
			</div>
		</>
	);
}
