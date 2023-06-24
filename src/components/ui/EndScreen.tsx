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
				<p>Du hast die Innovation Factory repariert!</p>
				<p className="description">
					Wenn du weitere Fragen oder Anregungen hast dann informiere dich doch bei unseren Mitarbeitern. <br />
					Solltest du das Spiel nochmal spielen wollen, klicke einfach auf dein Touchscreen.
				</p>
			</div>
		</div>
	);
}

export default EndScreen;
