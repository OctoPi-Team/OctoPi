import NavigationButton from '../ui/NavigationButton';
import { Scene, SceneProps } from '../../App';

export default function BTPinfo({ setSceneHook }: SceneProps) {
	function changeView(done = true) {
		if (done) setSceneHook(Scene.Overworld);
	}
	return (
		<div>
			<img src={'/BTPinfo/BTP Vorteile.png'} alt={'info'} style={{ width: '100%', height: '100%	' }} />
			<div>
				<NavigationButton
					position="absolute"
					left="30px"
					bottom="30px"
					text="&larr;"
					onClick={() => {
						changeView(true);
						setSceneHook(Scene.Overworld);
					}}
				/>
			</div>
		</div>
	);
}
