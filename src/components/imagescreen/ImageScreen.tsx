import "./imgScreen.css"

type ImageScreenProps = {
    imageSource: string;
    onclick?: () => void;
}
export default function ImageScreen({ imageSource, onclick = () => { } }: ImageScreenProps) {
    return <div onClick={onclick}>
        <img className="imgScreen" src={imageSource} />
    </div>
}