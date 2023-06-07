import { PARTS } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { Box3 } from 'three';


type PartsPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function PartsPlatform({ position = [0, 0, 0], reference, addCollisionBox }: PartsPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[24, 0.5, 18]} reference={reference} color={PARTS} />
			<ObjectLoad
				path="/Plattformbeschriftung/PartsLogo/parts-logo.glb"
				position={[position[0] - 10, position[1] + 10, position[2]]}
				scale={[2, 2, 2]}
				rotation={[0, 180, 0]}
				collsisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Metallregal/metallregal.glb"
				position={[position[0], position[1], position[2] - 1]}
				scale={[0.5, 0.5, 0.5]}
				rotation={[0, 0, 0]}
				collsisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kaputtesMetallregal/kaputtesMetallregal.glb"
				position={[position[0] + 5, position[1], position[2] + 2]}
				scale={[0.5, 0.5, 0.5]}
				rotation={[0, 90, 0]}
				collsisionRefSetter={addCollisionBox}
			/>
		</>
	);
}
