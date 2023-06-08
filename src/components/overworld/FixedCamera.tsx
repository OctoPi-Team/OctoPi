import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrthographicCamera } from 'three';

type CameraProps = {
	distanceFromPlayerToCamera: number;
	visibility: boolean;
};

function FixedCamera({ distanceFromPlayerToCamera, visibility }: CameraProps) {
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

	if (!visibility && camera.zoom < 40) {
		camera.zoom = 40;
	}

	return <orthographicCamera ref={cameraRef} />;
}

export default FixedCamera;
