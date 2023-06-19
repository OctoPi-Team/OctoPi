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
import Squircle from '../../overworld/objects/Squircle';

const INPUT_TUBE_POSITION = TILE_SIZE * (SIZE_OF_GAME_MATRIX[1] - 1) + (SIZE_OF_GAME_MATRIX[1] - 1) * SPACING;
export const VECTORS_FOR_INPUT_TUBE = [
	new Vector3(-1.9 + 2 * SPACING, 0.7, INPUT_TUBE_POSITION),
	new Vector3(-15, 0.7, INPUT_TUBE_POSITION),
	new Vector3(-1.9 + SPACING, 5, INPUT_TUBE_POSITION),
	new Vector3(-15, 5, INPUT_TUBE_POSITION),
];

export default function ShipmentMiniGame({ setSceneHook, visible, setPlayerPos }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	const [finished, setFinished] = useState(false);
	const [info, setInfo] = useState(false);
	const [currentVariation, setVariation] = useState<number>(Math.floor(Math.random() * 6));
	const CAM_WIDTH = 80;
	const CAM_HEIGHT = 80;

	useEffect(() => {
		if (visible) {
			setSceneHook(Scene.Overworld);
		}
		return () => {
			// set position of Player for when he spawns again after the game
			if (setPlayerPos) setPlayerPos(new Vector3(9, 4, 25));
		};
	}, [visible, setSceneHook]);

	function changeView(done = true) {
		if (done) setSceneHook(Scene.Overworld);
	}
	function reloadGame() {
		let randomVariant = -1;
		while (randomVariant > 0 && randomVariant == currentVariation) randomVariant = Math.floor(Math.random() * 6); // in range number of variants
		setVariation(randomVariant);
		setSceneHook(Scene.Overworld);
		setTimeout(() => {
			setSceneHook(Scene.Shipment);
		}, 50);
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
						window.alert(
							'Willkommen zu unserem Spiel Operation:Innovation! Das Spiel ist ganz simpel. Klicke auf eine der verschiedenen Grids und verändere somit die Position der verschiedenen Röhren. Sobald du eine Verbindung erfolgreich zum Trichter geschafft hast, hast du gewonnen! Viel Erfolg!'
						);
					}}
				/>
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
					}}
				/>
				<NavigationButton
					position="absolute"
					left="30px"
					bottom="30px"
					text="&larr;"
					onClick={() => {
						changeView(true);
						setSceneHook(Scene.Overworld);
					}}
				/>
			</div>
			<div style={{ width: '100vw', height: '100vh' }} onClick={() => changeView(finished)} tabIndex={0}>
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }} shadows={{ type: PCFSoftShadowMap }}>
					<DirLight />
					<ambientLight intensity={0.35} />
					<Squircle position={[0, 2, 0]} color="beige" dimensions={[69, 0.1, 69]} rotation={[Math.PI / 2, 0, 0]} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={30} visibility={visible} />}
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
				{finished && WinScreen(reloadGame, () => changeView(true))}
				{info && <InfoButton />}
			</div>
		</>
	);
}
