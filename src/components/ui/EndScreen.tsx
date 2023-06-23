import '../ui/style/endscreen.css';

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
			<div className="victorybanner">
				<p>Gewonnen!</p>
			</div>
		</div>
	);
}

export default EndScreen;
