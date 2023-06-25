import '../ui/style/endscreen.css';
import ImageScreen from './ImageScreen';

type EndScreenProps = {
	onclick?: () => void;
};

function EndScreen({
	onclick = () => {
		// used for lint error message
		undefined;
	},
}: EndScreenProps) {
	return (
		<div className="endscreen" onClick={onclick}>
			<ImageScreen imageSource='/EndScreen.png' />
			<div className="victorybanner">
				<p>
					<span>Glückwunsch!</span>
					<br /> Du hast die Innovation Factory repariert!
				</p>
				<p className="description">
					Wenn du mehr über die Innovation Factory for SAP BTP erfahren möchtest, dann informiere dich doch bei unseren
					Mitarbeitern.
					<br /> Solltest du das Spiel nochmal spielen wollen, klicke einfach auf den Bildschirm.
				</p>
			</div>
		</div>
	);
}

export default EndScreen;
