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
				name={''}
				position={position}
				size={[14, 0.5, 17]}
				reference={reference}
				color={new Color(0xdaf0ee)}
			/>
			<ObjectLoad
				pathObj="/Text/DesignText.obj"
				pathMtl="/Text/DesignText.mtl"
				position={[position[0]+4, position[1]+2, position[2]]}
				scale={[1.5, 1.5, 1.5]}
				rotation={[0, 200, 0]}
			/>
			<ObjectLoad
				pathObj="/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.obj"
				pathMtl="/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.mtl"
				position={[position[0]-2, position[1], position[2]+ 2]}
				scale={[0.5, 0.5, 0.5]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Tisch/tisch.obj"
				pathMtl="/Tisch/tisch.mtl"
				position={[position[0] - 3, position[1], position[2] - 5]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 90, 0]}
			/>
			<ObjectLoad
				pathObj="/Hocker/hocker.obj"
				pathMtl="/Hocker/hocker.mtl"
				position={[position[0] + 2, position[1], position[2] - 15]}
				scale={[1, 1, 1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Buecherregal/buecherregal.obj"
				pathMtl="/Buecherregal/buecherregal.mtl"
				position={[position[0] + 5.5, position[1], position[2] + 7.6]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
			/>
			<ObjectLoad
				pathObj="/Zeichentisch/zeichentisch.obj"
				pathMtl="/Zeichentisch/zeichentisch.mtl"
				position={[position[0] - 4,position[1], position[2] + 7.6]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
			/>
			
		</>
	);
}
