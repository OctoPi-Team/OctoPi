import { Canvas } from '@react-three/fiber';
import { SceneProps } from '../../../App';
import Grid from './Grid';
import { OrbitControls } from '@react-three/drei';
import Tube from '../../overworld/objects/Tube';
import FixedCamera from '../../overworld/FixedCamera';
import ObjectLoad from '../../ObjectLoad';
import { Vector3 } from 'three';

export default function ShipMentMinigame({ setSceneHook }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	// const [visible, setVisible] = useState(true);
	// TODO add Loading Screen -> {visible && <LoadingScreen setVisible={setVisible} />}
	const SIZE: [number, number] = [4, 4];
	const SPACING = 0.2;
	const TILE_SIZE = 3;

	const rand = Math.ceil(Math.random() * SIZE[1]);
	const INPUTTUBEPOSSITION = (rand - 1) * TILE_SIZE + (rand - 1) * SPACING;
	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }} tabIndex={0}>
				<Canvas orthographic camera={{ zoom: 50, position: [40, 40, 40] }}>
					<directionalLight intensity={0.5} color={'white'} />
					<ambientLight intensity={0.5} />

					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}

					{/* <Tube name="Tube" position={[10, 2, 18]} size={[0.5, 8, 1]} /> */}
					<group position={[0, 4, 0]}>
						{/*nicht optimal, TODO in position in Grid*/}
						<Grid size={SIZE} />
						<ObjectLoad
							pathObj="/Trichter/trichter.obj"
							pathMtl="/Trichter/trichter.mtl"
							position={[(2.9 + 0.2) * SIZE[0], -3.3, -0.5]}
							scale={[0.25, 0.25, 0.25]}
							rotation={[0, 180, 0]}
						/>
						{/* TODO relation to the grid */}
						<Tube
							name="InputTubeInGame"
							position={[0, 2, 0]}
							color="#3aaa35"
							vectors={[
								new Vector3(-1.9, -1.3, INPUTTUBEPOSSITION),
								new Vector3(-3, -1.2, INPUTTUBEPOSSITION),
								new Vector3(-3.5, 2, INPUTTUBEPOSSITION),
								new Vector3(-8, 2, INPUTTUBEPOSSITION),
							]}
						/>
					</group>
				</Canvas>
			</div>
		</>
	);
}
