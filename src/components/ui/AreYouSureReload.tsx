import { Dispatch, SetStateAction } from 'react';
import '../ui/style/areyousurereload.css';

type Props = {
	setAreYouSureReload: Dispatch<SetStateAction<boolean>>;
};

function AreYouSureReload({ setAreYouSureReload }: Props) {
	return (
		<>
			<div className="reload">
				Möchtest du das Spiel wirklich neustarten?
				<div className="buttons">
					<button
						onClick={() => {
							setAreYouSureReload(false);
						}}>
						Abbruch
					</button>
					<button
						onClick={() => {
							location.reload();
						}}>
						Neustart
					</button>
				</div>
			</div>
		</>
	);
}

export default AreYouSureReload;
