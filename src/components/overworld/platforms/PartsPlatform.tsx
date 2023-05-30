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
			<SimplePlatform position={position} size={[24, 0.5, 18]} reference={reference} color={new Color(0x686868)} />
			<ObjectLoad
				pathObj="/Plattformbeschriftung/PartsLogo/parts-logo.obj"
				pathMtl="/Plattformbeschriftung/PartsLogo/parts-logo.mtl"
				position={[position[0] + 1, position[1] + 10, position[2]]}
				scale={[2, 2, 2]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				pathObj="/Metallregal/metallregal.obj"
				pathMtl="/Metallregal/metallregal.mtl"
				position={[position[0], position[1], position[2] - 1]}
				scale={[0.5, 0.5, 0.5]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/kaputtesMetallregal/kaputtesMetallregal.obj"
				pathMtl="/kaputtesMetallregal/kaputtesMetallregal.mtl"
				position={[position[0], position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
