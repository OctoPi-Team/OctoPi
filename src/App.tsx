import './index.css';

import { useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';

export enum Scene {
	Overworld,
	Shipment,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
};

export default function App() {
	const [scene, setScene] = useState<Scene>(Scene.Overworld);

	return (
		<>
			{scene == Scene.Overworld && <Overworld setSceneHook={setScene} />}
			{scene == Scene.Shipment && <ShipmentGame setSceneHook={setScene} />}
		</>
	);
}
