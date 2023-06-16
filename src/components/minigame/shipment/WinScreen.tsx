export default function WinScreen(onClickNewGame: () => void, onClickBack: () => void) {
	return (
		<div className={'win'}>
			Du hast gewonnen!
			<div className={'buttons'}>
				<button onClick={onClickNewGame}>Starte neues Spiel</button>
				<button onClick={onClickBack}>Zurück zur Plattform</button>
			</div>
		</div>
	);
}
