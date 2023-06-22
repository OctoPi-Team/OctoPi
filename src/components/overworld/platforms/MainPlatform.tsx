import SimplePlatform from './SimplePlatform';
import { PINK } from '../../../AllColorVariables';
import THREE, { Box3 } from 'three';
import ObjectLoad from '../../ObjectLoad';
import Button from '../objects/Button';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function MainPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
	buttonReference,
}: MainPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[20, 0.5, 13]} reference={reference} color={PINK} />
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0], position[1], position[2] + 5.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TV/tv.glb"
				position={[position[0] - 0.02, position[1] + 0.87, position[2] + 5.65]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button
				customName="BTPinfo"
				position={[position[0] - 9.9, position[1] + 6, position[2] - 6]}
				reference={buttonReference}
			/>
		</>
	);
}
