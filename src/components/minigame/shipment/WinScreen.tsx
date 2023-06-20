import { PlatformFixProps } from '../../../App';

export default function WinScreen(
	onClickNewGame: () => void,
	onClickBack: () => void,
	setIsPlatformFixed: ((newProps: Partial<PlatformFixProps>) => void) | undefined
) {
	return (
		<>
			<div className={'win'}>
				Du hast gewonnen!
				<div className={'buttons'}>
					<button
						onClick={() => {
							onClickBack;
							if (setIsPlatformFixed) {
								setIsPlatformFixed({ shipment: true });
							}
						}}>
						Zurück zur Plattform
					</button>
					<button
						onClick={() => {
							onClickNewGame;
							if (setIsPlatformFixed) {
								setIsPlatformFixed({ shipment: true });
							}
						}}>
						Starte neues Spiel
					</button>
				</div>
			</div>
		</>
	);
}
