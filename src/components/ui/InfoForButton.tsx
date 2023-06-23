import React from 'react';
import {
	HEADSHIPMENT,
	INFOSHIPMENT,
	HEADDESIGN,
	INFODESIGN,
	INFOPRODUCTION,
	HEADMONITORING,
	INFOMONITORING,
	HEADENGINEERING,
	INFOENGINEERING,
	HEADPARTS,
	INFOPARTS,
	HEADPRODUCTION,
} from './InfotextAboutPlatforms';
import showPlatformInfo from './Infoboard';

interface ButtonInfoProps {
	isOnButton: boolean;
	buttonName: string;
}
const startMinigameButtons = ['Shipment', 'Parts', 'Monitoring', 'Design', 'Engineering', 'Production'];
const InfoForButton: React.FC<ButtonInfoProps> = ({ isOnButton, buttonName }) => {
	if (isOnButton) {
		switch (buttonName) {
			case 'shipmentInfo':
				return showPlatformInfo(HEADSHIPMENT, INFOSHIPMENT);
			case 'designInfo':
				return showPlatformInfo(HEADDESIGN, INFODESIGN);
			case 'productionInfo':
				return showPlatformInfo(HEADPRODUCTION, INFOPRODUCTION);
			case 'monitoringInfo':
				return showPlatformInfo(HEADMONITORING, INFOMONITORING);
			case 'engineeringInfo':
				return showPlatformInfo(HEADENGINEERING, INFOENGINEERING);
			case 'partsInfo':
				return showPlatformInfo(HEADPARTS, INFOPARTS);
			default:
				return startMinigameButtons.includes(buttonName) ? (
					<div className="button">Minigame: {buttonName.toUpperCase()}</div>
				) : null;
		}
	} else {
		return null;
	}
};

export default InfoForButton;
