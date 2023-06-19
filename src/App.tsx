import './index.css';
import { useEffect, useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import { Vector3 } from 'three';
import { resetKeys } from './components/overworld/Player';
import BTPinfo from './components/BTPinfo/BTPinfo';

export enum Scene {
	Overworld,
	Shipment,
	BTPinfo,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
	visible?: boolean;
	setPlayerPos?: (setplayerpos: Vector3) => void;
	playerPos?: Vector3;
	isPlatformFixed?: PlatformFixProps;
	setIsPlatformFixed?: (newProps: Partial<PlatformFixProps>) => void;
};

export type PlatformFixProps = {
	shipment: boolean;
	design: boolean;
	parts: boolean;
	engineering: boolean;
	monitoring: boolean;
	production: boolean;
};

export default function App() {
	const [playerstartingPos, setPlayerstartingPos] = useState<Vector3>(new Vector3(0, 0, 0));
	const [scene, setScene] = useState<Scene>(Scene.Overworld);
	const [visible, setVisible] = useState(true);
	const [isPlatformFixed, setIsPlatformFixed] = useState<PlatformFixProps>({
		shipment: false,
		design: false,
		parts: false,
		engineering: false,
		monitoring: false,
		production: false,
	});

	const delay = 90000000;
	let timeoutId: NodeJS.Timeout;
	let hasMoved = false;

	function setPlatformFixed(newProps: Partial<PlatformFixProps>) {
		setIsPlatformFixed(prevProps => ({
			...prevProps,
			...newProps,
		}));
	}

	useEffect(() => {
		if (!visible && !hasMoved) {
			timeoutId = setTimeout(() => setVisible(true), delay);
		}
		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setVisible(true), delay); // Adjust the delay (in milliseconds) as per your requirement
			hasMoved = false;
		};

		const handleActivity = () => {
			hasMoved = true;
			resetTimer();
		};
		// Add event listeners to detect user activity
		window.addEventListener('touchmove', handleActivity);
		window.addEventListener('keydown', handleActivity);
		window.addEventListener('click', handleActivity);
		// Start the timer initially
		resetTimer();

		// Clean up event listeners
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('touchmove', handleActivity);
			window.removeEventListener('keydown', handleActivity);
			window.removeEventListener('click', handleActivity);
		};
	}, [visible]);

	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			{scene === Scene.Overworld && (
				<Overworld
					setSceneHook={setScene}
					visible={visible}
					playerPos={playerstartingPos}
					setIsPlatformFixed={setPlatformFixed}
					isPlatformFixed={isPlatformFixed}
				/>
			)}
			{scene === Scene.Shipment && (
				<ShipmentGame
					setSceneHook={setScene}
					visible={visible}
					setPlayerPos={playerPos => {
						setPlayerstartingPos(playerPos);
						resetKeys();
					}}
				/>
			)}
			{scene === Scene.BTPinfo && <BTPinfo />}
		</>
	);
}
