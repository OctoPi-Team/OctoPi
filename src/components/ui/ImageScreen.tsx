import './style/imageScreen.css';
import NavigationButton from '../ui/NavigationButton';
import { useEffect, useState } from 'react';

type ImageScreenProps = {
	imageSource: string;
	onclick?: () => void;
	backButton?: boolean;
	init?: () => void;
	opacity?: number;
};
export default function ImageScreen({
	imageSource,
	onclick = () => {},
	backButton = false,
	init,
	opacity,
}: ImageScreenProps) {
	if (init) init();
	const [text, setText] = useState('Bitte warten...');

	useEffect(() => {
		if (opacity === 1) setText('Klicken Sie, um fortzufahren');
	}, [opacity]);

	return (
		<div onClick={onclick} style={{ opacity: opacity }}>
			<img className="imgScreen" src={imageSource} />
			<h1 className="imgScreenText">{text}</h1>
			{backButton && <NavigationButton position="fixed" left="30px" bottom="30px" text="&larr;" onClick={onclick} />}
		</div>
	);
}
