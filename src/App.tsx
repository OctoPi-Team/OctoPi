/* eslint-disable react/no-unknown-property */
import './styles.css';
import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import Video from './Video';

//Load .obj file
function Model(props: object) {
	const materials = useLoader(MTLLoader, '/Ebene.mtl');
	const obj = useLoader(OBJLoader, '/Ebene.obj', loader => {
		materials.preload();
		loader.setMaterials(materials);
	});
	return <primitive object={obj} {...props} />;
}

export default function App() {
	const [visible, setVisible] = useState(true);
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			{visible && (
				<React.Fragment>
					<video
						className="video"
						onEnded={() => {
							setVisible(false);
						}}
						height={window.innerHeight}
						width={window.innerWidth}
						preload="auto"
						autoPlay
						data-setup="{}">
						<source src="10.mp4" type="video/mp4"></source>
					</video>
				</React.Fragment>
			)}
			<Canvas style={{ visibility: visible ? 'hidden' : 'visible' }}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Model />
			</Canvas>
		</div>
	);
}
