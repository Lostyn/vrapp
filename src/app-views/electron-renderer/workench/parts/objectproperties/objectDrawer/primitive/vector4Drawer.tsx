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

	// const onChange = (evt) => {
	// 	const attr = evt.target.getAttribute('data-key');
	// 	const result = new Vector4(props.property.x, props.property.y, props.property.z, props.property.w);
	// 	result[attr] = parseFloat(evt.target.value);
	// 	props.onChange(result);
	// }

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
					placeholder='x' value={props.property.x.toString()} onChange={onChangeX}
				/>
				<NumericInput
					placeholder='y' value={props.property.y.toString()} onChange={onChangeY}
				/>
				<NumericInput
					placeholder='z' value={props.property.z.toString()} onChange={onChangeZ}
				/>
				<NumericInput
					placeholder='w' value={props.property.w.toString()} onChange={onChangeW}
				/>
			</div>
		</div>
	)
}

export default Vector4Drawer;