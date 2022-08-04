import React from 'react'
import { Vector3 } from 'three';

type IProps = {
	onChange: (Vector3) => void;
	property: Vector3;
}

const Vector3Drawer = (props: IProps) => {

	const onChange = (evt) => {
		const attr = evt.target.getAttribute('data-key');
		const result = new Vector3(props.property.x, props.property.y, props.property.z);
		result[attr] = parseFloat(evt.target.value);
		props.onChange(result);
	}

	return (
		<div>
			<span>x: <input type="number" data-key='x' value={props.property.x} onChange={onChange}/></span>
			<span>y: <input type="number" data-key='y' value={props.property.y} onChange={onChange}/></span>
			<span>z: <input type="number" data-key='z' value={props.property.z} onChange={onChange}/></span>
		</div>
	)
}

export default Vector3Drawer;