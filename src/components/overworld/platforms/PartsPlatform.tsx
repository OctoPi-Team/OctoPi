import { PARTS } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import Text from '../../Text';
import { Box3 } from 'three';
import Button from '../objects/Button';

type PartsPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function PartsPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
	addCollisionBox,
}: PartsPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[24, 0.5, 18]} reference={reference} color={PARTS} />
			<Text text={'Parts'} position={[position[0] - 10, position[1] + 10, position[2]]} rotation={[0, 180, 0]} />
			<ObjectLoad
				path="/Metallregal/metallregal.glb"
				position={[position[0], position[1], position[2] - 1]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kaputtesMetallregal/kaputtesMetallregal.glb"
				position={[position[0] + 5, position[1], position[2] + 2]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button position={[position[0] - 9, position[1] + 6, position[2] - 6]} reference={buttonreference} />
		</>
	);
}
