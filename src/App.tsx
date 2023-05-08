/* eslint-disable react/no-unknown-property */
import './styles.css';
import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { MTLLoader, OBJLoader } from 'three-stdlib';
//import Video from './Video';

//Load .obj file
function Model(props: object) {
	const materials = useLoader(MTLLoader, '/Ebene.mtl');
	const obj = useLoader(OBJLoader, '/Ebene.obj', loader => {
		materials.preload();
		loader.setMaterials(materials);
	});
	return <primitive object={obj} {...props} />;
}

function Video({ setVisible }: any) {
	return (
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
	);
}

export default function App() {
	const [visible, setVisible] = useState(true);
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			{visible && <Video setVisible={setVisible} />}
			<Canvas style={{ visibility: visible ? 'hidden' : 'visible' }}>
				<mesh
					onClick={() => {
						window.open('https://duckduckgo.com/');
					}}>
					<Suspense fallback={null}>
						<Stage>
							<Model />
						</Stage>
					</Suspense>
					<OrbitControls />
				</mesh>
			</Canvas>
		</div>
	);
}
