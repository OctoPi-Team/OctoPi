import { Box3, Vector3 } from 'three';
import { PRODUCTION } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import Text from '../objects/Text';
import Tube from '../objects/Tube';
import { PlatformFixProps } from '../../../App';
import Button from '../objects/Button';
import Cylinder from '../objects/Cylinder';

type ProductionPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function ProductionPlatform({
	position = [0, 0, 0],
	reference,
	buttonReference,
	addCollisionBox,
	isPlatformFixed,
}: ProductionPlatformOptions): JSX.Element {
	const visibiltyForDamaged = !isPlatformFixed?.production;
	const visibiltyForFixed = isPlatformFixed?.production;
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

			<group>
				<ObjectLoad
					path={'/Roboterarm/roboterarm.glb'}
					position={[position[0] - 6, position[1], position[2]]}
					scale={isPlatformFixed?.production ? [0.46, 0.46, 0.46] : [0.11, 0.11, 0.11]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1.1, 4, 1.1) }]}
					visible={visibiltyForFixed}
				/>
				<ObjectLoad
					path={'/Roboterarm_kaputt/roboterarm_kaputt.glb'}
					position={[position[0] - 6, position[1], position[2]]}
					scale={isPlatformFixed?.production ? [0.46, 0.46, 0.46] : [0.11, 0.11, 0.11]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1.1, 4, 1.1) }]}
					visible={visibiltyForDamaged}
				/>
			</group>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] + 8, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(2.5, 2, 1.5) },
					{ positionOffset: new Vector3(0, 0, -1.3), size: new Vector3(1, 2, 1) },
				]}
			/>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] + 8, position[1], position[2] - 2.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(2.5, 2, 1.5) },
					{ positionOffset: new Vector3(0, 0, 1.3), size: new Vector3(1, 2, 1) },
				]}
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
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(2.5, 2, 1.5) },
					{ positionOffset: new Vector3(0, 0, 1.3), size: new Vector3(1, 2, 1) },
				]}
			/>
			<ObjectLoad
				path="/MonitorMitSchreibtischUndStuhl/monitorMitSchreibtischUndStuhl.glb"
				position={[position[0], position[1], position[2] - 4]}
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
				position={[position[0] + 2, position[1], position[2] - 3.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[
					{ positionOffset: new Vector3(), size: new Vector3(1.5, 2, 2.5) },
					{ positionOffset: new Vector3(1.3, 0, 0), size: new Vector3(1, 2, 1) },
				]}
			/>
			<Tube
				name="tubeToProduction"
				position={[0, 0, 0]}
				size={[0.5, 8, 1]}
				vectors={[
					new Vector3(-1, -1, -3),
					new Vector3(-1, -1, -8),
					new Vector3(-1, 0, -10),
					new Vector3(-13, 0, -10),
					new Vector3(-13, 0, -14),
					new Vector3(-13, 4, -14),
					new Vector3(-22.5, 4, -14),
					new Vector3(-22.5, 3.5, -14),
					new Vector3(-22.5, 3.5, -17),
					new Vector3(-21, 3.5, -17),
					new Vector3(-21, 3.5, -22),
					new Vector3(-21, 2, -22),
					new Vector3(-21, 2, -27),
					new Vector3(-21, 4, -27),
					new Vector3(-21, 4, -30),
					new Vector3(-21, 2, -30),
					new Vector3(-14, 2, -30),
					new Vector3(-14, 2, -25),
				]}
				ballAnimation={isPlatformFixed?.production}
			/>
			<Cylinder
				position={[position[0] - 10, position[1], position[2] - 0.05]}
				color={PRODUCTION}
				collisionRefSetter={addCollisionBox}
			/>
			<Cylinder
				position={[position[0] - 9.9, position[1], position[2] - 4.9]}
				color={PRODUCTION}
				collisionRefSetter={addCollisionBox}
			/>
			<Button
				customName="production"
				position={[position[0] - 11, position[1] + 6, position[2] - 9]}
				reference={buttonReference}
			/>
		</>
	);
}
