import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Props {
	name: string,
	label?: string
}

type InputProps = JSX.IntrinsicElements['textarea'] & Props;

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
	const inputRef = useRef(null);
	const { fieldName, defaultValue, registerField } = useField(name);
	
	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return label ? (
		<div className="inputBlock">
			<label htmlFor={fieldName}>{label}</label>
			<textarea id={fieldName} className="input" ref={inputRef} defaultValue={defaultValue} {...rest} />
		</div>
	) : (
		<textarea id={fieldName} className="input" ref={inputRef} defaultValue={defaultValue} {...rest} />
	)
}

export default Input