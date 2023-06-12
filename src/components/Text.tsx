import { Color, extend, Object3DNode } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import OpenSans from './fonts/Open Sans_Regular.json';
import { MathUtils } from 'three';

extend({ TextGeometry });

declare module '@react-three/fiber' {
	interface ThreeElements {
		textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
	}
}

type TextProps = {
	text: string;
	position: [number, number, number];
	rotation: [number, number, number];
	color: Color;
};

export default function Text({ text, position, rotation, color }: TextProps) {
	// any font can be used, but they need to be converted using https://gero3.github.io/facetype.js/
	const font = new FontLoader().parse(OpenSans);
	return (
		<mesh
			position={position}
			rotation={[MathUtils.degToRad(rotation[0]), MathUtils.degToRad(rotation[1]), MathUtils.degToRad(rotation[2])]}
			scale={[1.5, 1.5, 0.45]}>
			<textGeometry args={[text, { font, size: 1.05, height: 1.2, curveSegments: 10 }]} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
}
