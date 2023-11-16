import React from 'react';
import Container from './Container';

type ButtonProps = {
	children: React.ReactNode,
	disabled?: boolean,
	colour?: string,
	className?: string,
	size?: string,
	onClick?: Function,
	elementType?: string
};

export default function Button({ children, disabled, colour, className, size, onClick, elementType }: ButtonProps) {
	return (
		<Container
			elementType={ elementType || 'button' }
			className={ `button ${className}` }
			onClick={ onClick }
			disabled={ disabled }
			states={ [{
				className: 'button-disabled', condition: disabled
			}, {
				className: size || ''
			}, {
				className: colour || ''
			}] }
		>
			{ children }
		</Container>
	);
}
