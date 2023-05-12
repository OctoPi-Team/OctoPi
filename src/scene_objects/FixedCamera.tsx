import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { PerspectiveCamera } from 'three';

type CameraProps = {
	distance_from_player_to_camera: number;
};

function FixedCamera({ distance_from_player_to_camera }: CameraProps) {
	const { scene, camera } = useThree();
	const cameraRef = useRef<PerspectiveCamera>(null);
	useFrame(() => {
		if (!scene || !cameraRef.current) return;
		const player = scene.getObjectByName('player');
		if (!player) return;
		const playerPosition = player.position;
		if (playerPosition) {
			camera.position.set(
				playerPosition.x - distance_from_player_to_camera,
				playerPosition.y + distance_from_player_to_camera,
				playerPosition.z - distance_from_player_to_camera
			);
			camera.lookAt(playerPosition);
		}
	});
	return <perspectiveCamera ref={cameraRef} />;
}

export default FixedCamera;
