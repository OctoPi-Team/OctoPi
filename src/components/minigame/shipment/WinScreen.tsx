import { Scene, SceneProps } from '../../../App';

function WinScreen({ setSceneHook }: SceneProps) {
	return (
		<div className={'win'}>
			Du hast gewonnen!
			<div className={'buttons'}>
				<button
					onClick={() => {
						setSceneHook(Scene.Overworld);
						setTimeout(() => {
							setSceneHook(Scene.Shipment);
						}, 50);
					}}>
					Starte neues Spiel
				</button>{' '}
				<button
					onClick={() => {
						setSceneHook(Scene.Overworld);
					}}>
					Zurück zur Plattform
				</button>
			</div>
		</div>
	);
}

export default WinScreen;
