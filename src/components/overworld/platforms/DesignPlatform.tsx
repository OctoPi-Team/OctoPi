import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { DESIGN } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3 } from 'three';
import Button from '../objects/Button';

type DesignPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function DesignPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
	addCollisionBox,
}: DesignPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[18, 0.5, 20]} reference={reference} color={DESIGN} />
			<Text
				text={'DESIGN'}
				color={DESIGN}
				position={[position[0] + 10, position[1], position[2] + 3]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path="/TischMitHocker/tischMitHocker.glb"
				position={[position[0] - 4, position[1], position[2] - 5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 30, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TischMitHocker/tischMitHocker.glb"
				position={[position[0] + 2, position[1], position[2] - 4.5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 100, 0]}
				collisionRefSetter={addCollisionBox}
			/>

			<ObjectLoad
				path="/Buecherregal/buecherregal.glb"
				position={[position[0] - 7, position[1], position[2] + 9]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] + 6, position[1], position[2] + 9]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.glb"
				position={[position[0], position[1], position[2] + 8.5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>

			<ObjectLoad
				path="/Whiteboard_neu/whiteboard_neu.glb"
				position={[position[0] + 8, position[1], position[2] - 6.5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.glb"
				position={[position[0] - 7.5, position[1], position[2] + 2]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 60, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button position={[position[0] - 7, position[1] + 6, position[2] - 9]} reference={buttonreference} />
		</>
	);
}
