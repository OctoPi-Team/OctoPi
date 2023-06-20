import './index.css';
import { useEffect, useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import { Vector3 } from 'three';
import { resetKeys } from './components/overworld/Player';
import ImageScreen from './components/imagescreen/ImageScreen';

// startscreen is not done via scene initially to reduce loading time,
// therefore it is realized via the 'visible' hook
export enum Scene {
	Overworld,
	Shipment,
	EndScreen,
	IdleScreen
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
	const delay = 2 * 60 * 1000;
	let timeoutId: NodeJS.Timeout;

	function setPlatformFixed(newProps: Partial<PlatformFixProps>) {
		setIsPlatformFixed(prevProps => ({
			...prevProps,
			...newProps,
		}));
	}

	const resetTimer = () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			setVisible(false);
			setScene(Scene.IdleScreen);
		}, delay);
	};

	// Add event listeners to detect user activity
	document.addEventListener('touchmove', resetTimer);
	document.addEventListener('keydown', resetTimer);
	document.addEventListener('click', resetTimer);
	document.addEventListener('mousemove', resetTimer);

	useEffect(() => {
		// re-start the timer
		resetTimer();
		// Clean up event listeners
		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener('touchmove', resetTimer);
			document.removeEventListener('keydown', resetTimer);
			document.removeEventListener('click', resetTimer);
			document.removeEventListener('mousemove', resetTimer);
		};
	}, [visible]);

	useEffect(() => {
		if (isPlatformFixed.design
			&& isPlatformFixed.parts
			&& isPlatformFixed.monitoring
			&& isPlatformFixed.production
			&& isPlatformFixed.engineering
			&& isPlatformFixed.shipment
		)
			setScene(Scene.EndScreen);
	}, [isPlatformFixed]);

	function showStartScreen() {
		// reset fixed state
		setIsPlatformFixed({
			shipment: false,
			design: false,
			parts: false,
			engineering: false,
			monitoring: false,
			production: false,
		});
		// reset player movement
		resetKeys();
		// show startscreen scene (async to avoid that the event is catched by the loading screen immediately)
		setTimeout(() => {
			setScene(Scene.Overworld);
			setVisible(true);
		}, 0);
	};
	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} setScene={setScene} />}
			{scene === Scene.Overworld && (
				<Overworld
					setSceneHook={setScene}
					visible={visible}
					playerPos={playerstartingPos}
					setIsPlatformFixed={setPlatformFixed}
					isPlatformFixed={isPlatformFixed}
				/>
			)}
			{scene === Scene.EndScreen && <ImageScreen imageSource={"/EndScreen.png"} onclick={showStartScreen} />}
			{scene === Scene.IdleScreen && <ImageScreen imageSource={"/Innovation-Factory.jpg"} onclick={showStartScreen} />}
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
		</>
	);
}
