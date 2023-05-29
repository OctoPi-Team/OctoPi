import './index.css';

import { useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';

export enum Scene {
	Overworld,
	Shipment,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
};

export default function App() {
	const [scene, setScene] = useState<Scene>(Scene.Shipment);
	const [visible, setVisible] = useState(false);

	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			{scene == Scene.Overworld && <Overworld sceneProps={{ setSceneHook: setScene }} visible={visible} />}
			{scene == Scene.Shipment && <ShipmentGame setSceneHook={setScene} />}
		</>
	);
}
