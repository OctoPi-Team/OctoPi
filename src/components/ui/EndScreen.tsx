type EndScreenProps = {
	onclick?: () => void;
};

function EndScreen({
	onclick = () => {
		// used for lint error message
		undefined;
	},
}: EndScreenProps) {
	return <div onClick={onclick}>EndScreen</div>;
}

export default EndScreen;
