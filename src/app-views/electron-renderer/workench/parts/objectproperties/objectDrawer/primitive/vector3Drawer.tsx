import React from 'react'
import { Vector3 } from 'three';
import NumericInput from '../inputs/numeric-input';

type IProps = {
	label: string,
	onChange: (Vector3) => void;
	property: Vector3;
	placeHolders?: string[]
}

const Vector3Drawer = (props: IProps) => {
	const holders = props.placeHolders || ['x', 'y', 'z'];

	const onChange = (key, value) => {
		const result = new Vector3(props.property.x, props.property.y, props.property.z);
		result[key] = parseFloat(value);
		props.onChange(result);
	}

	const onChangeX = (value) => onChange('x', value);
	const onChangeY = (value) => onChange('y', value);
	const onChangeZ = (value) => onChange('z', value);


	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input ui-vector-input'>
				<NumericInput placeholder={holders[0]} value={props.property.x.toString()} onChange={onChangeX} />
				<NumericInput placeholder={holders[1]} value={props.property.y.toString()} onChange={onChangeY} />
				<NumericInput placeholder={holders[2]} value={props.property.z.toString()} onChange={onChangeZ} />
			</div>
		</div>
	)
}

export default Vector3Drawer;