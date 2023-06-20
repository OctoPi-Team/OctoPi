import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import img from '/BTPinfo/BTP Vorteile.png';
import NavigationButton from '../ui/NavigationButton';
import { Scene, SceneProps } from '../../App';

export default function BTPinfo({ setSceneHook, visible, setPlayerPos }: SceneProps) {
	function changeView(done = true) {
		if (done) setSceneHook(Scene.Overworld);
	}
	return (
		<div id={'img-container'}>
			<img id={'img'} src={'/BTPinfo/BTP Vorteile.png'} alt={'info'} style={{ width: '100%', height: '100%	' }} />
			<div id="ui-elements">
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
