import NavigationButton from '../ui/NavigationButton';
import { Scene, SceneProps } from '../../App';
import { Vector3 } from 'three';

export default function BTPinfo({ setSceneHook, setPlayerPos }: SceneProps) {
	if (setPlayerPos)
		setPlayerPos(new Vector3(0, 0, 1));
	return (
		<div style={{ "zIndex": 1 }} id={'img-container'}>
			<div id="ui-elements">
				<NavigationButton
					position="absolute"
					left="30px"
					bottom="30px"
					text="&larr;"
					onClick={() => {
						setSceneHook(Scene.Overworld);
					}}
				/>
			</div>
		</div>
	);
}
