import { Box3, Vector3 } from 'three';
import { PRODUCTION } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import Text from '../../Text';
import Tube from '../objects/Tube';
import Button from '../objects/Button';

type ProductionPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function ProductionPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
	addCollisionBox,
}: ProductionPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[21, 0.5, 12]} reference={reference} color={PRODUCTION} />
			<Text
				text={'PRODUCTION'}
				color={PRODUCTION}
				position={[position[0] + 2, position[1], position[2] + 7]}
				rotation={[0, 180, 0]}
			/>
			<gridHelper position={[position[0] - 6, position[1], position[2]]} args={[7, 7, 'black', 'white']} />

			<ObjectLoad
				path="/Roboterarm_kaputt/roboterarm_kaputt.glb"
				position={[position[0] - 3, position[1], position[2] + 1]}
				scale={[0.09, 0.09, 0.09]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBox={{ positionOffset: new Vector3(), size: new Vector3(1, 4, 1) }}
			/>

			<ObjectLoad
				path="/Roboterarm_kaputt/roboterarm_kaputt.glb"
				position={[position[0] - 6, position[1], position[2]]}
				scale={[0.11, 0.11, 0.11]}
				rotation={[0, 7, 0]}

				collisionRefSetter={addCollisionBox}
				customCollisionBox={{ positionOffset: new Vector3(), size: new Vector3(1, 4, 1) }}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] + 8, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] + 8, position[1], position[2] - 2.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Whiteboard_neu/whiteboard_neu.glb"
				position={[position[0] + 7.3, position[1], position[2] + 4.3]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 30, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Hocker/hocker.glb"
				position={[position[0] + 5.5, position[1], position[2] + 4]}
				scale={[0.7, 0.7, 0.7]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Hocker/hocker.glb"
				position={[position[0] + 8, position[1], position[2] + 3]}
				scale={[0.7, 0.7, 0.7]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Hocker/hocker.glb"
				position={[position[0] + 6.5, position[1], position[2] + 3]}
				scale={[0.7, 0.7, 0.7]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0], position[1], position[2] - 2.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0], position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] + 2, position[1], position[2] - 3.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Tube
				position={[position[0] - 9, position[1], position[2] - 1]}
				size={[0.5, 8, 1]}
				vectors={[
					new Vector3(0, 0, 0),
					new Vector3(0, 1, 0),
					new Vector3(0, 1, -7),
					new Vector3(0, -1, -7),
					new Vector3(6, -1, -7),
					new Vector3(6, -1, -1),
				]}
			/>
			<Button position={[position[0] - 11, position[1] + 6, position[2] - 9]} reference={buttonreference} />
		</>
	);
}
