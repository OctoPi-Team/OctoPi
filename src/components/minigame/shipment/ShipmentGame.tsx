import { Canvas, useFrame } from '@react-three/fiber';
import { Scene, SceneProps } from '../../../App';
import Grid from './Grid';
import { OrbitControls } from '@react-three/drei';
import Tube from '../../overworld/objects/Tube';
import FixedCamera from '../../overworld/FixedCamera';
import ObjectLoad from '../../ObjectLoad';
import { Vector3 } from 'three';
import { GREEN, WHITE } from '../../../AllColorVariables';
import NavigationButton from '../../overworld/objects/NavigationButton';
import { resetKeys } from '../../overworld/Player';
import Sphere from './Sphere';
export const TILE_SIZE = 3;
export const SIZE_OF_GAME_MATRIX: [number, number] = [4, 4];
export const SPACING = 0.2;
import { useEffect } from 'react';


export default function ShipMentMinigame({ setSceneHook, visible }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	// const [visible, setVisible] = useState(true);
	// TODO add Loading Screen -> {visible && <LoadingScreen setVisible={setVisible} />}

	//calculate random input tube position with relation to the grid
	const INPUTTUBEPOSSITION = TILE_SIZE * TILE_SIZE + TILE_SIZE * SPACING;
	const VECTORS_FOR_TUBE = [
		new Vector3(-1.9, -1.3, INPUTTUBEPOSSITION),
		new Vector3(-3, -1.2, INPUTTUBEPOSSITION),
		new Vector3(-3.5, 2, INPUTTUBEPOSSITION),
		new Vector3(-20, 1.5, INPUTTUBEPOSSITION),
	];
	useEffect(() => {
		if (visible === true) {
			setSceneHook(Scene.Overworld);
		}
	}, [visible, setSceneHook]);

	// @ts-ignore
	return (
		<>
			<NavigationButton
				position="absolute"
				right="75px"
				top="50px"
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
				top="50px"
				text="i"
				onClick={() => {
					window.alert(
						'Willkommen zu unserem Spiel Operation:Innovation! Das Spiel ist ganz simpel. Klicke auf eine der verschiedenen Grids und verändere somit die Position der verschiedenen Röhren. Sobald du eine Verbindung erfolgreich zum Trichter geschafft hast, hast du gewonnen! Viel Erfolg!'
					);
				}}
			/>
			<NavigationButton
				position="absolute"
				left="20px"
				bottom="20px"
				text="&larr;"
				onClick={() => setSceneHook(Scene.Overworld)}
			/>
			<div style={{ width: '100vw', height: '100vh' }} tabIndex={0}>
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }}>
					<directionalLight intensity={0.5} color={WHITE} />
					<ambientLight intensity={0.5} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} visibility={visible} />}

					<group position={[0, 4, 0]}>
						<Grid size={SIZE_OF_GAME_MATRIX} />
						<ObjectLoad
							path="/Trichter/trichter.glb"
							position={[(2.9 + 0.2) * SIZE_OF_GAME_MATRIX[0], -3.3, -0.5]}
							scale={[0.25, 0.25, 0.25]}
							rotation={[0, 180, 0]}
						/>
						<Tube
							name="InputTubeInGame"
							position={[0, 2, 0]}
							color={GREEN}
							vectors={VECTORS_FOR_TUBE}
							detailed={true}
						/>
					</group>
				</Canvas>
			</div>
			{resetKeys()}
		</>
	);
}
