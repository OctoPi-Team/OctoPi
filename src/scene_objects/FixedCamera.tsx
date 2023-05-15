import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrthographicCamera } from 'three';

type CameraProps = {
	distanceFromPlayerToCamera: number;
};

function FixedCamera({ distanceFromPlayerToCamera }: CameraProps) {
	const { scene, camera } = useThree();
	const cameraRef = useRef<OrthographicCamera>(null);
	useFrame(() => {
		if (!scene || !cameraRef.current) return;
		const player = scene.getObjectByName('player');
		if (!player) return;
		const playerPosition = player.position;
		if (playerPosition) {
			camera.position.set(
				playerPosition.x - distanceFromPlayerToCamera,
				playerPosition.y + distanceFromPlayerToCamera,
				playerPosition.z - distanceFromPlayerToCamera
			);
			camera.lookAt(playerPosition);
		}
	});
	return <orthographicCamera ref={cameraRef} />;
}

export default FixedCamera;
