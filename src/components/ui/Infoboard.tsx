

export default function Infoboard(text: string/*, onClickBack: () => void*/) {
        
	return (
		<div className={'infoPlatforms'}>
			{text}
			<div className={'buttons'}>
			{/*<button onClick={onClickBack}>ok</button>*/}
			</div>
		</div>
	);
}