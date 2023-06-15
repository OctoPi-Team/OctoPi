import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { ENGINEERING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';
import Tube from '../objects/Tube';
import Button from '../objects/Button';
import Cylinder from '../objects/Cylinder';

type EngineeringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function EngineeringPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
	addCollisionBox,
}: EngineeringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform name={''} position={position} size={[15, 0.5, 18]} reference={reference} color={ENGINEERING} />

			<Text
				text={'ENGINEERING'}
				color={ENGINEERING}
				position={[position[0] + 8.5, position[1], position[2] - 8]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path="/Zeichentisch/zeichentisch.glb"
				position={[position[0] - 6.5, position[1], position[2] - 3]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/ZeichentischKaputt/zeichentischKaputtMitPapier.glb"
				position={[position[0] + 5, position[1], position[2] + 8]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			{/* <ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0] - 2.5, position[1], position[2] + 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/> */}
			<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0] - 3, position[1], position[2] + 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(2.5, 2, 1.5) },
					{ positionOffset: new Vector3(0, 0, -1.5), size: new Vector3(1.3, 2, 1.3) }
				]}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] - 6, position[1], position[2] + 3]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(1.5, 2, 2.5) },
					{ positionOffset: new Vector3(1.5, 0, 0), size: new Vector3(1, 2, 1) }
				]}
			/>
			<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0] + 1.5, position[1], position[2] + 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(2.5, 2, 1.5) },
					{ positionOffset: new Vector3(0, 0, -1.5), size: new Vector3(1.3, 2, 1.3) }
				]}
			/>
			{/*
			<Tube
				name="Tube2"
				position={[position[0] - 7, position[1], position[2] + 3]}
				size={[0.5, 8, 1]}
				vectors={[
					new Vector3(0, 0, 3),
					new Vector3(0, 1, 3),
					new Vector3(-1.5, 1, 3),
					new Vector3(-1.5, 0, 3),
					new Vector3(-1.5, -1, 3),
					new Vector3(-1.5, -1, 6.2),
					new Vector3(6, -1, 6.2),
					new Vector3(6, 1, 6.2),
					new Vector3(6, 1, 5),
					new Vector3(6, 1, 4),
					new Vector3(6, 0, 4),
				]}
			/>
			*/}
			<ObjectLoad
				path="/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.glb"
				position={[position[0] - 0.5, position[1], position[2] - 7.5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
				<ObjectLoad
				path="/Teleskop/teleskop.glb"
				position={[position[0] - 5.3, position[1], position[2] - 7.5]}
				scale={[1.5, 1.5, 1.5]}
				rotation={[0, 210, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Cylinder position={[position[0] - 1, position[1], position[2] + 7 ]} color={ENGINEERING}/>
			<Cylinder position={[position[0] + 6.8, position[1], position[2] + 7]} color={ENGINEERING}/>
			<Cylinder position={[position[0] - 6, position[1], position[2] + 6]} color={ENGINEERING}/>
			<Button position={[position[0] - 7, position[1] + 6, position[2] - 9]} reference={buttonreference} />
		</>
	);
}
