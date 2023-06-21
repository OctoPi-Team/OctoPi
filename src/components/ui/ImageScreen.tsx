import './style/imageScreen.css';

type ImageScreenProps = {
	imageSource: string;
};
export default function ImageScreen({ imageSource }: ImageScreenProps) {
	return (
		<div>
			<img className="imgScreen" src={imageSource} alt="Image" />
		</div>
	);
}
