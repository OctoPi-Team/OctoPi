export default function WinScreen(onClickNewGame: () => void, onClickBack: () => void) {
	return (
		<div className={'win'}>
			Du hast gewonnen!
			<div className={'buttons'}>
				<button onClick={onClickBack}>Zurück zur Plattform</button>
				<button onClick={onClickNewGame}>Starte neues Spiel</button>
			</div>
		</div>
	);
}
