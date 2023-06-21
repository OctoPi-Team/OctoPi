import { PlatformFixProps } from '../../../App';

export default function WinScreen(
	onClickNewGame: () => void,
	onClickBack: (b: boolean) => void,
	setIsPlatformFixed: ((newProps: Partial<PlatformFixProps>) => void) | undefined
) {
	return (
		<>
			<div className={'win'}>
				Du hast gewonnen!
				<div className={'buttons'}>
					<button
						onClick={() => {
							onClickBack(true);
							if (setIsPlatformFixed) {
								setIsPlatformFixed({ shipment: true });
							}
						}}>
						Zurück zur Plattform
					</button>
					<button onClick={onClickNewGame}>Starte neues Spiel</button>
				</div>
			</div>
		</>
	);
}
