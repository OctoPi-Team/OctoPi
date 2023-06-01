import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type EngineeringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function EngineeringPlatform({
	position = [0, 0, 0],
	reference,
}: EngineeringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Engineering'}
				position={position}
				size={[15, 0.5, 18]}
				reference={reference}
				color={new Color(0xdabdd65)}
			/>
			<ObjectLoad
				path="/Wegweiser/wegweiser.glb"
				position={[position[0] + 7, position[1], position[2]]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Zeichentisch/zeichentisch_2.glb"
				position={[position[0] - 2, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Schreibtisch/schreibtisch_3.glb"
				position={[position[0], position[1], position[2] + 7]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
			/>
			<ObjectLoad
				path="/Monitor/monitor.glb"
				position={[position[0] - 2.5, position[1] + 4, position[2] + 3.5]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				path="/Drehstuhl/drehstuhl_3.glb"
				position={[position[0], position[1], position[2] + 6]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 180, 0]}
			/>
		</>
	);
}
