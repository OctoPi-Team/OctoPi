import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { ENGINEERING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';
import Tube from '../objects/Tube';
import { PlatformFixProps } from '../../../App';
import Button from '../objects/Button';

type EngineeringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function EngineeringPlatform({
	position = [0, 0, 0],
	reference,
	buttonReference,
	addCollisionBox,
	isPlatformFixed,
}: EngineeringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[15, 0.5, 18]} reference={reference} color={ENGINEERING} />
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
				path="/Zeichentisch/zeichentisch.glb"
				position={[position[0] + 5.5, position[1], position[2] + 8]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			{/*<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0] - 2.5, position[1], position[2] + 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>*/}
			<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0] - 3, position[1], position[2] + 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(2.5, 2, 1.5) },
					{ positionOffset: new Vector3(0, 0, -1.5), size: new Vector3(1.3, 2, 1.3) },
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
					{ positionOffset: new Vector3(1.5, 0, 0), size: new Vector3(1, 2, 1) },
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
					{ positionOffset: new Vector3(0, 0, -1.5), size: new Vector3(1.3, 2, 1.3) },
				]}
			/>
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
			<ObjectLoad
				path={
					isPlatformFixed?.engineering
						? '/Whiteboard_neu/whiteboard_neu.glb'
						: '/Whiteboard_kaputt_neu/whiteboard_kaputt_neu.glb'
				}
				position={[position[0] - 0.5, position[1], position[2] - 7.5]}
				scale={[0.6, 0.6, 0.6]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button
				customName="engineering"
				position={[position[0] - 7, position[1] + 6, position[2] - 9]}
				reference={buttonReference}
			/>
		</>
	);
}
