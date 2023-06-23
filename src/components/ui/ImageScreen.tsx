import './style/imageScreen.css';
import NavigationButton from '../ui/NavigationButton';
import { useEffect, useState } from 'react';

type ImageScreenProps = {
	imageSource: string;
	onclick?: () => void;
	backButton?: boolean;
	init?: () => void;
	opacity?: number;
	isStartScreen?: boolean;
};
export default function ImageScreen({
	imageSource,
	onclick = () => {
		// used for lint error message
		undefined;
	},
	backButton = false,
	init,
	opacity,
	isStartScreen = false,
}: ImageScreenProps) {
	const [text, setText] = useState('Bitte warten');
	useEffect(() => {
		if (init) init();
	}, []);

	useEffect(() => {
		if (opacity === 1) setText('Klicke, um fortzufahren');
	}, [opacity]);

	return (
		<div onClick={onclick} style={{ opacity: opacity }}>
			<img className="imgScreen" src={imageSource} />
			{isStartScreen && (
				<>
					<h1 className={`img-screen-text-heading`}>Operation: Innovation</h1>
					<h2 className={`img-screen-text ${opacity != 1 ? 'dot-animation' : 'pump-animation'}`}>{text}</h2>
				</>
			)}
			{backButton && <NavigationButton position="fixed" left="30px" bottom="30px" text="&larr;" onClick={onclick} />}
		</div>
	);
}
