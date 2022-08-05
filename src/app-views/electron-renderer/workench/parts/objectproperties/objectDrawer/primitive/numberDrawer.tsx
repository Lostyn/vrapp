import React, { useState } from 'react'

type IProps = {
	label: string,
	onChange: (float) => void;
	property: number;
}

const NumberDrawer = (props: IProps) => {
	const check = (s:string):boolean => {
		const result = parseFloat(s);
		return !isNaN(result);
	}

	const [value, setValue ] = useState<string>(props.property.toString());

	const onChange = (evt) => {
		let input = evt.target.value;
		setValue(input);

		if (check(input))
			props.onChange(input);
	}

	const onBlur = (evt) => {
		if (!check(value)) {
			props.onChange(0);
			setValue('0');
		} else {
		}
	}


	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input ui-vector-input'>
				<div className='ui-element ui-numeric-input'>
					<input type="text" value={value} onChange={onChange} onBlur={onBlur}/>
				</div>
			</div>
		</div>
	)
}

export default NumberDrawer;