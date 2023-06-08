import { extend, Object3DNode } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Geologica from './Geologica_Roman_Black_Regular.json';
import { GREEN } from '../AllColorVariables';
import { MathUtils } from 'three';

extend({ TextGeometry })

declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}

type TextProps = {
    text: string;
    position: [number, number, number];
    rotation: [number, number, number];
}

export default function Text({ text, position, rotation }: TextProps) {
    // any font can be used, but they need to be converted using https://gero3.github.io/facetype.js/
    const font = new FontLoader().parse(Geologica);
    return (
        <mesh position={position}
            rotation={[
                MathUtils.degToRad(rotation[0]),
                MathUtils.degToRad(rotation[1]),
                MathUtils.degToRad(rotation[2])
            ]} scale={[0.3, 0.3, 0.5]}>
            <textGeometry args={[text, { font, size: 5, height: 1 }]} />
            <meshLambertMaterial attach='material' color={GREEN} />
        </mesh>
    );
}