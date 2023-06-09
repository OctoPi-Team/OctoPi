import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { DESIGN } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3 } from 'three';

type FloorOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function Floor({ position = [0, 0, 0], reference, addCollisionBox }: FloorOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[200, 0.1, 200]} reference={reference} color={'white'} />
		</>
	);
}
