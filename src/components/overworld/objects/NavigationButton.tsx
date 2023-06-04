import React from 'react';

type Position = 'absolute';

interface NavigationButtonProps {
	text: string;
	position: Position;
	right?: string;
	top?: string;
	left?: string;
	bottom?: string;
	onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ position, right, top, left, bottom, text, onClick }) => {
	return (
		<button
			style={{
				position,
				right,
				top,
				left,
				bottom,
				zIndex: '100',
				background: 'green',
				border: 'none',
				padding: '10px',
				borderRadius: '50px',
				color: 'white',
				cursor: 'pointer',
				width: '40px',
				height: '40px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '20px',
			}}
			onClick={onClick}>
			{text}
		</button>
	);
};

export default NavigationButton;
