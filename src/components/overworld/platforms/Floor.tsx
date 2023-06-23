import SimplePlatform from './SimplePlatform';
import { Box3, BoxGeometry } from 'three';

type FloorOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function Floor({ position = [0, 0, 0] }: FloorOptions): JSX.Element {
	return (
		<>
			<mesh receiveShadow
				position={position}>
				<boxGeometry args={[2500, 0.1, 10000]} />
				<meshStandardMaterial color={'beige'} />
			</mesh>
		</>
	);
}
