import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { PerspectiveCamera } from 'three';

type CameraProps = {
    distanceFromPlayerToCamera: number;
};

function FixedCamera({ distanceFromPlayerToCamera }: CameraProps) {
    const { scene, camera } = useThree();
    const cameraRef = useRef<PerspectiveCamera>(null);
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
    return <perspectiveCamera ref={cameraRef} />;
}

export default FixedCamera;
