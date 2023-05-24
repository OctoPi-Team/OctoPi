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
			<SimplePlatform
				position={[0, 0, 0]}
                size={[20, 0.5, 13]}
                reference={reference}
                color={new Color(0x3aaa35)}
			/>
			<ObjectLoad
				pathObj="/Palette/palette.obj"
				pathMtl="/Palette/palette.mtl"
				position={[14, position[0], 10.5]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
