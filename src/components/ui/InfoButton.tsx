import './style/information.css';

export function InfoButton(text: string) {
	return (
		<div className={'info'}>
			{text}
			<div className={'triangle'}></div>
		</div>
	);
}

export default InfoButton;
