import React from 'react'
import { Vector4 } from 'three';
import NumericInput from '../inputs/numeric-input';

type IProps = {
	label: string,
	onChange: (Vector4) => void;
	property: Vector4;
	placeHolders?: string[]
}

const Vector4Drawer = (props: IProps) => {

	const holders = props.placeHolders || ['x', 'y', 'z', 'w'];

	const onChange = (key, value) => {
		const result = new Vector4(props.property.x, props.property.y, props.property.z, props.property.w);
		result[key] = parseFloat(value);
		props.onChange(result);
	}

	const onChangeX = (value) => onChange('x', value);
	const onChangeY = (value) => onChange('y', value);
	const onChangeZ = (value) => onChange('z', value);
	const onChangeW = (value) => onChange('w', value);

	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input ui-vector-input'>
				<NumericInput
					placeholder={holders[0]} value={props.property.x.toString()} onChange={onChangeX}
				/>
				<NumericInput
					placeholder={holders[1]} value={props.property.y.toString()} onChange={onChangeY}
				/>
				<NumericInput
					placeholder={holders[2]} value={props.property.z.toString()} onChange={onChangeZ}
				/>
				<NumericInput
					placeholder={holders[3]} value={props.property.w.toString()} onChange={onChangeW}
				/>
			</div>
		</div>
	)
}

export default Vector4Drawer;