import { useState } from "react";


export default function Infoboard(head: string, text: string, onClose: () => void) {
   /* console.log("design");
	const [showInfo, setShowInfo] = useState(true);
	const handleClose = () => {
    	setShowInfo(false);
    	onClose();
  	};

  if (!showInfo) {
    return null;
  }*/
	return (
		<div className={'info'}>
			<h1>{head}</h1>
			{text}
			<div className={'button'}>
			{/*<button onClick={handleClose}>ok</button>*/}			
			</div>
		</div>
	);
}