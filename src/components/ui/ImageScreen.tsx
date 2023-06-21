import "./style/imageScreen.css"
import NavigationButton from "../ui/NavigationButton";

type ImageScreenProps = {
	imageSource: string;
	onclick?: () => void;
	backButton?: boolean;
	init?: () => void
}
export default function ImageScreen({ imageSource, onclick = () => { }, backButton = false, init }: ImageScreenProps) {
	if (init)
		init();
	return <div onClick={onclick}>
		<img className="imgScreen" src={imageSource} />
		{backButton && <NavigationButton
			position="fixed"
			left="30px"
			bottom="30px"
			text="&larr;"
			onClick={onclick}
		/>}
	</div>
}