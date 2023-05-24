import { Text } from '@react-three/drei';
import { BLACK } from '../../../AllColorVariables';

type CreateTextProps = {
	text: string;
	position: [number, number, number];
	rotation: number;
};

export default function CreateText({ text, position, rotation }: CreateTextProps) {
	// rotation in Radiant
	return (
		<mesh position={position} rotation={[Math.PI / 2, Math.PI, rotation]}>
			<Text fontSize={1} font="" color={BLACK} anchorX="center" anchorY="middle">
				{text}
			</Text>
			<meshStandardMaterial attach="material" color={BLACK} />
		</mesh>
	);
}
