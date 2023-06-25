import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import { DirectionalLight, DirectionalLightHelper, OrthographicCamera, PCFSoftShadowMap, Vector3 } from 'three';

import './style/victoryscreen.css';

import { GREEN } from '../../../AllColorVariables';
import { Scene, SceneProps } from '../../../App';
import FixedCamera from '../../FixedCamera';
import ObjectLoad from '../../ObjectLoad';
import NavigationButton from '../../ui/NavigationButton';
import './style/victoryscreen.css';
import WinScreen from './WinScreen';
import InfoButton from '../../ui/InfoButton';

import Tube from './Tube';
import Grid, { SIZE_OF_GAME_MATRIX, SPACING, TILE_SIZE } from './Grid';
import Floor from '../../overworld/platforms/Floor';

const INPUT_TUBE_POSITION = TILE_SIZE * (SIZE_OF_GAME_MATRIX[1] - 1) + (SIZE_OF_GAME_MATRIX[1] - 1) * SPACING;
export const VECTORS_FOR_INPUT_TUBE = [
	new Vector3(-1.9 + 2 * SPACING, 0.7, INPUT_TUBE_POSITION),
	new Vector3(-15, 0.7, INPUT_TUBE_POSITION),
	new Vector3(-1.9 + SPACING, 5, INPUT_TUBE_POSITION),
	new Vector3(-15, 5, INPUT_TUBE_POSITION),
];
function getGameVariation() {
	return Math.floor(Math.random() * 6);
}

export default function ShipmentMiniGame({ setSceneHook, setPlayerPos, setIsPlatformFixed }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	const [finished, setFinished] = useState(false);
	const [info, setInfo] = useState(false);
	const [currentVariation, setVariation] = useState<number>(getGameVariation());
	const CAM_WIDTH = 80;
	const CAM_HEIGHT = 80;

	useEffect(() => {
		return () => {
			// set position of Player for when he spawns again after the game
			if (setPlayerPos) setPlayerPos(new Vector3(9, 4.25, 25));
		};
	}, []);

	function setShipmentGameToBeFixed() {
		if (finished && setIsPlatformFixed) {
			setIsPlatformFixed({ shipment: true });
		}
	}
	function changeView(done = true) {
		if (done) setSceneHook(Scene.Overworld);
	}
	function reloadGame() {
		let randomVariant = -1;
		while (randomVariant > 0 && randomVariant == currentVariation) randomVariant = Math.floor(Math.random() * 6); // in range number of variants
		setVariation(randomVariant);
		setSceneHook(Scene.EmptyScreen);
		setTimeout(() => {
			setSceneHook(Scene.Shipment);
		}, 0);
		setShipmentGameToBeFixed();
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
					position={[3, 100, 3]}
					ref={dirLight}
					shadow-mapSize={[2048, 2048]}
					intensity={0.15}
					castShadow={true}>
					<orthographicCamera
						attach="shadow-camera"
						position={[8, 14, 12]}
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
			<div id="ui-elements">
				<NavigationButton position="absolute" right="100px" top="40px" text={'\u21BB'} onClick={reloadGame} />
				<NavigationButton
					position="absolute"
					right="30px"
					top="40px"
					text="i"
					onClick={() => {
						let stopTimer: string | number | NodeJS.Timeout | undefined;

						function setTimer() {
							stopTimer = setTimeout(() => {
								setInfo(false);
							}, 10000);
						}

						function clearTimer() {
							clearTimeout(stopTimer);
						}

						setInfo(true);
						if (info) {
							setInfo(false);
							clearTimer();
						}
						setTimer();
					}}
				/>
				<NavigationButton
					position="absolute"
					left="30px"
					bottom="30px"
					text="&larr;"
					onClick={() => {
						setShipmentGameToBeFixed();
						changeView(true);
						setSceneHook(Scene.Overworld);
					}}
				/>
			</div>
			<div
				style={{ width: '100vw', height: '100vh' }}
				tabIndex={0}
				onClick={() => {
					setInfo(false);
				}}>
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }} shadows={{ type: PCFSoftShadowMap }}>
					<DirLight />
					<ambientLight intensity={0.35} />
					<Floor position={[0, 2, 0]} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={30} visibility={false} />}
					<group position={[0, 4, 0]}>
						<Grid size={SIZE_OF_GAME_MATRIX} isFinished={setFinished} currentVariation={currentVariation} />
						<ObjectLoad
							path="/Trichter/trichter.glb"
							position={[(2.9 + 0.2) * SIZE_OF_GAME_MATRIX[0], -2.3, -0.5]}
							scale={[0.2, 0.2, 0.2]}
							rotation={[0, 180, 0]}
						/>
						<Tube name="InputTubeInGame" position={[0, 0, 0]} color={GREEN} vectors={VECTORS_FOR_INPUT_TUBE} />
					</group>
				</Canvas>
				{finished && WinScreen(reloadGame, changeView, setIsPlatformFixed)}
				{info &&
					InfoButton(
						'Willkommen zum Minispiel der Shipment-Platform! ' +
						'Klicke auf ein Rohr neben dem freien Feld, um deren Position zu tauschen. ' +
						'Stelle eine Verbindung zum Trichter her!'
					)}
			</div>
		</>
	);
}
