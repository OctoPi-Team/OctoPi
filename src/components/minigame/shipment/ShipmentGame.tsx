import { Canvas } from '@react-three/fiber';

import { Scene, SceneProps } from '../../../App';
import Grid from './Grid';
import { OrbitControls } from '@react-three/drei';
import Tube from '../../overworld/objects/Tube';
import FixedCamera from '../../overworld/FixedCamera';
import ObjectLoad from '../../ObjectLoad';
import { Vector3 } from 'three';
import { GREEN, WHITE } from '../../../AllColorVariables';
import NavigationButton from '../../overworld/objects/NavigationButton';

export default function ShipMentMinigame({ setSceneHook }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	// const [visible, setVisible] = useState(true);
	// TODO add Loading Screen -> {visible && <LoadingScreen setVisible={setVisible} />}
	const SIZE_OF_GAME_MATRIX: [number, number] = [4, 4];
	const SPACING = 0.2;
	const TILE_SIZE = 3;

	//calculate random input tube position with relation to the grid
	const RAND = Math.ceil(Math.random() * SIZE_OF_GAME_MATRIX[1]);
	const INPUTTUBEPOSSITION = (RAND - 1) * TILE_SIZE + (RAND - 1) * SPACING;
	const VECTORS_FOR_TUBE = [
		new Vector3(-1.9, -1.3, INPUTTUBEPOSSITION),
		new Vector3(-3, -1.2, INPUTTUBEPOSSITION),
		new Vector3(-3.5, 2, INPUTTUBEPOSSITION),
		new Vector3(-20, 1.5, INPUTTUBEPOSSITION),
	];

	return (
		<>
			{/* TODO proper button implement */}
			<NavigationButton position="absolute" right="75px" top="50px" text={'\u21BB'} 
			onClick={() => setSceneHook(Scene.Overworld)}			
			/>
			<NavigationButton position="absolute" right="30px" top="50px" text="i"
			onClick={() => setSceneHook(Scene.Overworld)}			
			/>
			<NavigationButton position="absolute" left="20px" bottom="20px" text="&larr; zurück"
			onClick={() => setSceneHook(Scene.Overworld)}			
			/>
			<div style={{ width: '100vw', height: '100vh' }} tabIndex={0}>
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }}>
					<directionalLight intensity={0.5} color={WHITE} />
					<ambientLight intensity={0.5} />
					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}

					<group position={[0, 4, 0]}>
						<Grid size={SIZE_OF_GAME_MATRIX} />
						<ObjectLoad
							path="/Trichter/trichter.glb"
							position={[(2.9 + 0.2) * SIZE_OF_GAME_MATRIX[0], -3.3, -0.5]}
							scale={[0.25, 0.25, 0.25]}
							rotation={[0, 180, 0]}
						/>
						<Tube name="InputTubeInGame" position={[0, 2, 0]} color={GREEN} vectors={VECTORS_FOR_TUBE} />
					</group>
				</Canvas>
			</div>
		</>
	);
}
