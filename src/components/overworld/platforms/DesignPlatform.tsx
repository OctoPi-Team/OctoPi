import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type DesignPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function DesignPlatform({ position = [0, 0, 0], reference }: DesignPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Design'}
				position={position}
				size={[14, 0.5, 17]}
				reference={reference}
				color={new Color(0xdaf0ee)}
			/>
			<ObjectLoad
				pathObj="/Whiteboard/whiteboard.obj"
				pathMtl="/Whiteboard/whiteboard.mtl"
				position={[position[0] - 2, position[1], position[2] + 5]}
				scale={[0.5, 0.5, 0.5]}
				rotation={[0, -0.3, 0]}
			/>
			<ObjectLoad
				pathObj="/TischMitStuehlen/tischMitStuehlen.obj"
				pathMtl="/TischMitStuehlen/tischMitStuehlen.mtl"
				position={[position[0] - 4, position[1], position[2] - 3]}
				scale={[0.08, 0.08, 0.08]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Buecherregal/buecherregal.obj"
				pathMtl="/Buecherregal/buecherregal.mtl"
				position={[position[0] + 5.5, position[1], position[2] + 7.6]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 1.6, 0]}
			/>
		</>
	);
}
