import React from "react";

interface IButton {
	text: string;
	onClick: () => void;
}

const Button = ({ text, onClick }: IButton) => {
	return (
		<button
			onClick={onClick}
			className='bg-emerald-600 hover:bg-emerald-800 text-white p-2 rounded-md'
		>
			{text}
		</button>
	);
};

export default Button;
