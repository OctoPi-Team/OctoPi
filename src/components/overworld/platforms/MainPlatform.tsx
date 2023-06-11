import SimplePlatform from './SimplePlatform';
import { GREEN, PINK } from '../../../AllColorVariables';
import { Box3 } from 'three';
import ObjectLoad from '../../ObjectLoad';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function MainPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: MainPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[20, 0.5, 13]} reference={reference} color={PINK} />
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] + 5, position[1], position[2] - 1]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Huetchen/huetchen.glb"
				position={[position[0] + 3, position[1], position[2] + 3]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] - 5, position[1], position[2]]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] + 1, position[1], position[2] - 6]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Kommode/kommode.glb"
				position={[position[0] - 3, position[1], position[2] + 6]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
		</>
	);
}

/*
<ObjectLoad
				path="/Kommode/kommode.glb"
				position={[position[0], position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path="/Kaffeemaschine/kaffeemaschine.glb"
				position={[position[0] - 2, position[1] + 2.2, position[2] + 4.5]}
				scale={[0.05, 0.05, 0.05]}
				rotation={[0, 0, 0]}
			/>
*/
