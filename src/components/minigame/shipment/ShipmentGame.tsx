import { Canvas } from '@react-three/fiber';
import { SceneProps } from '../../../App';
import Grid from './Grid';
import { LoadingScreen } from '../../startscreen/LoadingScreen';
import { useState } from 'react';
import { OrbitControls, Tube } from '@react-three/drei';
import FixedCamera from '../../overworld/FixedCamera';
import ObjectLoad from '../../ObjectLoad';

export default function ShipMentMinigame({ setSceneHook }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = false;
	const [visible, setVisible] = useState(true);

	// TODO add Loading Screen -> {visible && <LoadingScreen setVisible={setVisible} />}
	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }} tabIndex={0}>
				<Canvas orthographic camera={{ zoom: 70, position: [40, 40, 40] }}>
					<directionalLight intensity={0.5} color={'white'} />
					<ambientLight intensity={0.5} />

					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}

					{/* <Tube name="Tube" position={[10, 2, 18]} size={[0.5, 8, 1]} /> */}
					<group position={[0, 4, 0]}>
						{/*nicht optimal, TODO in position in Grid*/}
						<Grid size={[3, 3]} />
						<ObjectLoad
							pathObj="/Trichter/trichter.obj"
							pathMtl="/Trichter/trichter.mtl"
							position={[8.7, -3.3, -0.5]}
							scale={[0.25, 0.25, 0.25]}
							rotation={[0, 180, 0]}
						/>
					</group>
				</Canvas>
			</div>
		</>
	);
}
