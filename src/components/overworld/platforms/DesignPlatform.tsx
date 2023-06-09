import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { DESIGN } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3 } from 'three';

type DesignPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function DesignPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: DesignPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[18, 0.5, 20]} reference={reference} color={DESIGN} />
			<Text text={'Design'} position={[position[0] + 10, position[1], position[2] + 3]} rotation={[0, -90, 0]} />
			<ObjectLoad
				path="/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.glb"
				position={[position[0] - 2, position[1], position[2] + 2]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TischMitHocker/tischMitHocker.glb"
				position={[position[0] - 3, position[1], position[2] - 5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 265, 0]}
				collisionRefSetter={addCollisionBox}
			/>

			<ObjectLoad
				path="/Buecherregal/buecherregal.glb"
				position={[position[0] + 5.5, position[1], position[2] + 9]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Zeichentisch/zeichentisch.glb"
				position={[position[0] - 4, position[1], position[2] + 7.6]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
		</>
	);
}
