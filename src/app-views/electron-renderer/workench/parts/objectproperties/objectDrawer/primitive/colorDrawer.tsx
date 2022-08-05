import React, { useEffect, useState } from 'react'
import { Color } from 'three';

type IProps = {
	label: string,
	onChange: (string) => void;
	property: string;
}

const ColorDrawer = (props: IProps) => {
	var reg=/^0x[0-9A-F]{6}$/i;
	const check = (s:string):boolean => {
		const result = reg.test(s);
		reg.lastIndex = 0;
		return result;
	}

	const getDefaultProperty = () => {
		if (check(props.property)) return props.property;
		else return '0xffffff';
	}


	const [color, setColor ] = useState<string>(getDefaultProperty());



	const onChange = (evt) => {
		setColor(evt.target.value);

		let input = evt.target.value;
		if (check(input)) {
			props.onChange(input);
		}
	}

	const onBlur = (evt) => {
		if (!check(color)) {
			setColor(getDefaultProperty());
		}
	}

	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input'>
				<div className='ui-element ui-text-input'>
					<input type="text" value={color} onChange={onChange} onBlur={onBlur}/>
				</div>
			</div>
		</div>
	)
}

export default ColorDrawer;