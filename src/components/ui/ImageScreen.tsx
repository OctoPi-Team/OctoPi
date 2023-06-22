import './style/imageScreen.css';
import NavigationButton from '../ui/NavigationButton';

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
	opacity = 1,
}: ImageScreenProps) {
	if (init) init();
	return (
		<div onClick={onclick} style={{ opacity: opacity }}>
			<img className="imgScreen" src={imageSource} />
			{backButton && <NavigationButton position="fixed" left="30px" bottom="30px" text="&larr;" onClick={onclick} />}
		</div>
	);
}
