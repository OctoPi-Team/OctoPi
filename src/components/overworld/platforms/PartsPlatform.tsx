import { PARTS } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';
import Tube from '../objects/Tube';

type PartsPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function PartsPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: PartsPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[24, 0.5, 18]} reference={reference} color={PARTS} />
			<Text text={'Parts'} position={[position[0] - 10, position[1] + 10, position[2]]} rotation={[0, 180, 0]} />
			<group name="metallregale">
				<ObjectLoad
					path="/Metallregal/metallregal.glb"
					position={[position[0], position[1], position[2] - 5]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Metallregal/metallregal.glb"
					position={[position[0] + 3, position[1], position[2] - 5]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Metallregal/metallregal.glb"
					position={[position[0] - 3, position[1], position[2] - 5]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Metallregal/metallregal.glb"
					position={[position[0] - 6, position[1], position[2] - 5]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
			<group name="kaputteMetallregale">
				<ObjectLoad
					path="/kaputtesMetallregal/kaputtesMetallregal.glb"
					position={[position[0] + 7, position[1], position[2] + 2]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/kaputtesMetallregal/kaputtesMetallregal.glb"
					position={[position[0] + 7, position[1], position[2] + 5]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/kaputtesMetallregal/kaputtesMetallregal.glb"
					position={[position[0] + 7, position[1], position[2] - 1]}
					scale={[0.3, 0.3, 0.3]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
			<Tube
				name="Tube"
				position={[position[0] + 11, position[1] - 1.9, position[2] - 7]}
				size={[0.5, 8, 1]}
				vectors={[new Vector3(0, 0, 0), new Vector3(0, 3, 0), new Vector3(-5, 3, 0), new Vector3(-5, 0, 0)]}
			/>
		</>
	);
}
