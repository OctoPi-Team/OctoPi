import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type PartsPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function PartsPlatform({ position = [0, 0, 0], reference }: PartsPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Parts'}
				position={position}
				size={[13, 0.5, 18]}
				reference={reference}
				color={new Color(0x686868)}
			/>
			<ObjectLoad
				path="/Metallregal/metallregal.glb"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.5, 0.5, 0.5]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/kaputtesMetallregal/kaputtesMetallregal.glb"
				position={[position[0], position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
