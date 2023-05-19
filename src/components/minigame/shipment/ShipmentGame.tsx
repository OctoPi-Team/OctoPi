import { Canvas } from '@react-three/fiber';
import { SceneProps } from '../../../App';
import Grid from './Grid';
import { LoadingScreen } from '../../startscreen/LoadingScreen';
import { useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import FixedCamera from '../../overworld/FixedCamera';

export default function ShipMentMinigame({ setSceneHook }: SceneProps) {
	const ORBITAL_CONTROLS_ACTIVE = true;
	const [visible, setVisible] = useState(true);

	// TODO add Loading Screen -> {visible && <LoadingScreen setVisible={setVisible} />}

	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }} tabIndex={0}>
				<Canvas>
					<directionalLight intensity={0.5} color={'white'} />
					<ambientLight intensity={0.5} />

					{ORBITAL_CONTROLS_ACTIVE && <OrbitControls />}
					{!ORBITAL_CONTROLS_ACTIVE && <FixedCamera distanceFromPlayerToCamera={100} />}

					<Grid size={[3, 3]} />
				</Canvas>
			</div>
		</>
	);
}
