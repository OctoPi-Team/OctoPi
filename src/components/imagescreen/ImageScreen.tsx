import './imgScreen.css';

type ImageScreenProps = {
	imageSource: string;
	onclick?: () => void;
};
export default function ImageScreen({ imageSource }: ImageScreenProps) {
	return (
		<div>
			<img className="imgScreen" src={imageSource} />
		</div>
	);
}
