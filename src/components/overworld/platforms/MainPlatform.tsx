import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function MainPlatform({ position = [0, 0, 0], reference }: MainPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={[0, 0, 0]} size={[20, 0.5, 13]} reference={reference} color={new Color(0x3aaa35)} />
			<ObjectLoad
				path="/Kommode/kommode.glb"
				position={[position[0] - 2, position[1], position[2] + 3.5]}
				scale={[0.35, 0.35, 0.35]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path="/Kaffeemaschine/kaffeemaschine.glb"
				position={[position[0] - 2, position[1] + 2.2, position[2] + 4.5]}
				scale={[0.05, 0.05, 0.05]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
