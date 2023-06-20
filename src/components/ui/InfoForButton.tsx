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
} from './InfotextAboutPlatforms';
import showPlatformInfo from './Infoboard';

interface ButtonInfoProps {
	isOnButton: boolean;
	buttonName: string;
}

const InfoForButton: React.FC<ButtonInfoProps> = ({ isOnButton, buttonName }) => {
	if (isOnButton) {
		if (buttonName === 'shipmentInfo') {
			return showPlatformInfo(HEADSHIPMENT, INFOSHIPMENT);
		} else if (buttonName === 'designInfo') {
			return showPlatformInfo(HEADDESIGN, INFODESIGN);
		} else if (buttonName === 'productionInfo') {
			return showPlatformInfo('Production Platform', INFOPRODUCTION);
		} else if (buttonName === 'monitoringInfo') {
			return showPlatformInfo(HEADMONITORING, INFOMONITORING);
		} else if (buttonName === 'engineeringInfo') {
			return showPlatformInfo(HEADENGINEERING, INFOENGINEERING);
		} else if (buttonName === 'partsInfo') {
			return showPlatformInfo(HEADPARTS, INFOPARTS);
		} else {
			return <div className="button">Minigame: {buttonName.toUpperCase()}</div>;
		}
	} else return null;
};

export default InfoForButton;
