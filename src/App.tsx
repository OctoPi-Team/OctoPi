import './index.css';

import { useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import { get } from 'http';

export enum Scene {
	Overworld,
	Shipment,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
};

export default function App() {
	const [scene, setScene] = useState<Scene>(Scene.Overworld);
	const [visible, setVisible] = useState(true);
	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			{scene == Scene.Overworld && (
				<Overworld sceneProps={{ setSceneHook: setScene }} visible={visible} setLoadingScreenVisible={setVisible} />
			)}
			{scene == Scene.Shipment && <ShipmentGame setSceneHook={setScene} />}
		</>
	);
}
