import { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

type SimpleTextProps = {
	position: [number, number, number];
	textValue?: string;
};

export function SimpleText({ position, textValue }: SimpleTextProps) {
	const ref = useRef<THREE.Mesh>(null);

	const { camera } = useThree();
	useFrame(() => {
		if (ref.current) {
			ref.current.lookAt(camera.position);
		}
	});
	return (
		<Text
			ref={ref}
			position={[position[0], position[1] + 3, position[2]]}
			fontSize={1}
			font=""
			color={0x000000}
			anchorX="center"
			anchorY="middle">
			{textValue}
		</Text>
	);
}
