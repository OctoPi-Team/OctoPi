export default function showPlatformInfo(head: string, text: string) {
	return (
		<div className={'info-text'}>
			<h1>{head}</h1>
			{text}
			<div className={'button'}></div>
		</div>
	);
}
