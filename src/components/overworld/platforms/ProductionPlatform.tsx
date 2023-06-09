import { Box3 } from 'three';
import { PRODUCTION } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import Text from '../../Text';

type ProductionPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function ProductionPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: ProductionPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[22, 0.5, 14]} reference={reference} color={PRODUCTION} />
			<ObjectLoad
				path="/Roboterarm_kaputt/roboterarm_kaputt.glb"
				position={[position[0] - 2, position[1], position[2] + 2]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Text text={'PRODUCTION'} position={[position[0] + 2, position[1], position[2] + 8]} rotation={[0, 180, 0]} />
			<gridHelper position={[position[0] - 3, position[1], position[2]]} args={[10, 10, 'black', 'white']} />

			<group>
				<ObjectLoad
					path="/Notebook/notebook.glb"
					position={[position[0] + 4, position[1] + 6, position[2] - 5]}
					scale={[0.28, 0.28, 0.28]}
					rotation={[0, 150, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Schreibtisch/schreibtisch.glb"
					position={[position[0] + 8, position[1], position[2] - 2]}
					scale={[0.5, 0.5, 0.25]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Drehstuhl/drehstuhl.glb"
					position={[position[0] + 7, position[1], position[2] - 1.5]}
					scale={[0.25, 0.25, 0.25]}
					rotation={[0, 160, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
			<group name="corner-desk">
				<ObjectLoad
					path="/Schreibtisch/schreibtisch.glb"
					position={[position[0] + 8, position[1], position[2] + 3]}
					scale={[0.4, 0.4, 0.4]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Drehstuhl/drehstuhl.glb"
					position={[position[0] + 7, position[1], position[2] + 3]}
					scale={[0.22, 0.22, 0.22]}
					rotation={[0, 170, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Notebook/notebook.glb"
					position={[position[0] + 7, position[1] + 2.5, position[2] + 3]}
					scale={[0.25, 0.25, 0.25]}
					rotation={[0, 140, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
		</>
	);
}
