import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { ENGINEERING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3 } from 'three';

type EngineeringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function EngineeringPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: EngineeringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform name={''} position={position} size={[15, 0.5, 18]} reference={reference} color={ENGINEERING} />
			<Text text={'Engineering'} position={[position[0] + 8.25, position[1], position[2] - 9]} rotation={[0, 270, 0]} />
			<ObjectLoad
				path="/Wegweiser/wegweiser.glb"
				position={[position[0], position[1], position[2]]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Zeichentisch/zeichentisch.glb"
				position={[position[0] - 2, position[1], position[2] - 4]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0] - 2.5, position[1], position[2] + 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
		</>
	);
}
