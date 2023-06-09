import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, OrthographicCamera } from 'three';

type CameraProps = {
	distanceFromPlayerToCamera: number;
	visibility?: boolean;
};

function FixedCamera({ distanceFromPlayerToCamera, visibility }: CameraProps) {
	const { scene, camera } = useThree();
	const cameraRef = useRef<OrthographicCamera>(null);
	const targetZoom = visibility ? 4 : 40;
	const zoomSpeed = 0.01;

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

		const currentZoom = camera.zoom;
		const newZoom = MathUtils.lerp(currentZoom, targetZoom, zoomSpeed);
		camera.zoom = newZoom;
		camera.updateProjectionMatrix();
	});

	return <orthographicCamera ref={cameraRef} />;
}

export default FixedCamera;
