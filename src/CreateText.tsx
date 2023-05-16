import { Text } from '@react-three/drei';

type CreateTextProps = {
	text: string;
	position: [number, number, number];
	rotation: number;
};

export default function CreateText({ text, position, rotation }: CreateTextProps) {
	// rotation in Radiant
	return (
		<mesh position={position} rotation={[Math.PI / 2, Math.PI, rotation]}>
			<Text
				fontSize={1}
				font="/fonts/helvetiker_regular.typeface.json"
				color={0x000000}
				anchorX="center"
				anchorY="middle">
				{text}
			</Text>
			<meshStandardMaterial attach="material" color={0x000000} />
		</mesh>
	);
}
