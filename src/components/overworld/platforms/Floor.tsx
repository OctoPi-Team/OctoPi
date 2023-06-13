import SimplePlatform from './SimplePlatform';
import { Box3 } from 'three';

type FloorOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function Floor({ position = [0, 0, 0], reference }: FloorOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[2500, 0.1, 10000]} reference={reference} color={'white'} />
		</>
	);
}
