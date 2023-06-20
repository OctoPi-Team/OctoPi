export default function showPlatformInfo(head: string, text: string) {
	return (
		<div className={'button'}>
			<h4>{head}</h4>
			{text}
		</div>
	);
}
