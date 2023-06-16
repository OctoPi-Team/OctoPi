import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

import './victoryScreen.css';

import { GREEN, WHITE } from '../../../AllColorVariables';
import { Scene, SceneProps } from '../../../App';
import FixedCamera from '../../overworld/FixedCamera';
import ObjectLoad from '../../ObjectLoad';
import NavigationButton from '../../overworld/objects/NavigationButton';
import { resetKeys } from '../../overworld/Player';
import './victoryScreen.css';
import { useEffect, useState } from 'react';
import WinScreen from './WinScreen';
import InfoButton from '../../InfoButton';

import Tube from './Tube';
import Grid from './Grid';

export const TILE_SIZE = 3;
export const SIZE_OF_GAME_MATRIX: [number, number] = [3, 3];
export const SPACING = 0.2;
export default function ShipmentMiniGame({ setSceneHook, visible, setPlayerPos }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	const [finished, setFinished] = useState(false);
	const INPUT_TUBE_POSITION = TILE_SIZE * (SIZE_OF_GAME_MATRIX[1] - 1) + (SIZE_OF_GAME_MATRIX[1] - 1) * SPACING;
	const [info, setInfo] = useState(false);
	const VECTORS_FOR_INPUT_TUBE = [
		new Vector3(-1.9 + 2 * SPACING, 0.7, INPUT_TUBE_POSITION),
		new Vector3(-15, 0.7, INPUT_TUBE_POSITION),
		new Vector3(-1.9 + SPACING, 5, INPUT_TUBE_POSITION),
		new Vector3(-15, 5, INPUT_TUBE_POSITION),
	];
	const [currentVariation, setVariation] = useState<number>(Math.floor(Math.random() * 6));

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
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }}>
					<directionalLight intensity={0.5} color={WHITE} />
					<ambientLight intensity={0.5} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={30} visibility={visible} />}
					<group position={[0, 4, 0]}>
						<Grid size={SIZE_OF_GAME_MATRIX} isFinished={setFinished} currentVariation={currentVariation} />
						<ObjectLoad
							path="/Trichter/trichter.glb"
							position={[(2.9 + 0.2) * SIZE_OF_GAME_MATRIX[0], -3.3, -0.5]}
							scale={[0.25, 0.25, 0.25]}
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

function WinScreen(onClickNewGame: () => void, onClickBack: () => void) {
	return (
		<div className={'win'}>
			Du hast gewonnen!
			<div className={'buttons'}>
				<button onClick={onClickNewGame}>Starte neues Spiel</button>
				<button onClick={onClickBack}>Zurück zur Plattform</button>
			</div>
		</div>
	);
}
