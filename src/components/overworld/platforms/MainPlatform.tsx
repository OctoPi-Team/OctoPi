import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { GREEN } from '../../../AllColorVariables';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function MainPlatform({ position = [0, 0, 0], reference }: MainPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[20, 0.5, 13]} reference={reference} color={new Color(GREEN)} />
			<ObjectLoad
				pathObj="/Palette/palette.obj"
				pathMtl="/Palette/palette.mtl"
				position={[position[0], position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Kommode/kommode.obj"
				pathMtl="/Kommode/kommode.mtl"
				position={[position[0], position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Kaffeemaschine/kaffeemaschine.obj"
				pathMtl="/Kaffeemaschine/kaffeemaschine.mtl"
				position={[position[0] + 4, position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
