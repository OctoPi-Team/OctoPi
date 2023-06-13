import { Canvas } from '@react-three/fiber';
import { Scene, SceneProps } from '../../../App';
import Grid from './Grid';
import { OrbitControls } from '@react-three/drei';
import Tube from './Tube';
import FixedCamera from '../../overworld/FixedCamera';
import ObjectLoad from '../../ObjectLoad';
import { Vector3 } from 'three';
import { GREEN, WHITE } from '../../../AllColorVariables';
import NavigationButton from '../../overworld/objects/NavigationButton';
import { resetKeys } from '../../overworld/Player';

import { useEffect, useState } from 'react';

export const TILE_SIZE = 3;
export const SIZE_OF_GAME_MATRIX: [number, number] = [3, 3];
export const SPACING = 0.2;
export default function ShipMentMinigame({ setSceneHook, visible, setplayerpos }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	// TODO add Loading Screen -> {visible && <LoadingScreen setVisible={setVisible} />}
	const [done, setDone] = useState(false);
	//calculate random input tube position with relation to the grid
	const INPUTTUBEPOSSITION = TILE_SIZE * (SIZE_OF_GAME_MATRIX[1] - 1) + (SIZE_OF_GAME_MATRIX[1] - 1) * SPACING;
	const VECTORS_FOR_TUBE = [
		new Vector3(-1.9 + 2 * SPACING, 0.7, INPUTTUBEPOSSITION),
		new Vector3(-15, 0.7, INPUTTUBEPOSSITION),
		new Vector3(-1.9 + SPACING, 5, INPUTTUBEPOSSITION),
		new Vector3(-15, 5, INPUTTUBEPOSSITION),
	];
	useEffect(() => {
		if (visible === true) {
			setSceneHook(Scene.Overworld);
		}
	}, [visible, setSceneHook]);

	function changeview(done: boolean) {
		if (done) {
			if (setplayerpos) {
				setplayerpos(new Vector3(9, 4, 25));
			}
			setSceneHook(Scene.Overworld);
		}
	}
	return (
		<>
			<NavigationButton
				position="absolute"
				right="100px"
				top="40px"
				text={'\u21BB'}
				onClick={() => {
					setSceneHook(Scene.Overworld);
					setTimeout(() => {
						setSceneHook(Scene.Shipment);
					}, 50);
				}}
			/>
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
				left="30px"
				bottom="30px"
				text="&larr;"
				onClick={() => setSceneHook(Scene.Overworld)}
			/>
			<div style={{ width: '100vw', height: '100vh' }} onClick={() => changeview(done)} tabIndex={0}>
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }}>
					<directionalLight intensity={0.5} color={WHITE} />
					<ambientLight intensity={0.5} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={30} visibility={visible} />}

					<group position={[0, 4, 0]}>
						<Grid size={SIZE_OF_GAME_MATRIX} stateChanger={setDone} />
						<ObjectLoad
							path="/Trichter/trichter.glb"
							position={[(2.9 + 0.2) * SIZE_OF_GAME_MATRIX[0], -3.3, -0.5]}
							scale={[0.25, 0.25, 0.25]}
							rotation={[0, 180, 0]}
						/>
						<Tube name="InputTubeInGame" position={[0, 0, 0]} color={GREEN} vectors={VECTORS_FOR_TUBE} />
					</group>
				</Canvas>
			</div>
			{resetKeys()}
		</>
	);
}
