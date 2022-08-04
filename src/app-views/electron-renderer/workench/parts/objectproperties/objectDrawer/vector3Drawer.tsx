import React from 'react'
import { Vector3 } from 'three';

type IProps = {
	label: string,
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
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input ui-vector-input'>
				<div className='ui-element ui-numeric-input' placeholder='x'>
					<input type="number" data-key='x' value={props.property.x} onChange={onChange}/>
				</div>
				<div className='ui-element ui-numeric-input' placeholder='y'>
					<input type="number" data-key='y' value={props.property.y} onChange={onChange}/>
				</div>
				<div className='ui-element ui-numeric-input' placeholder='z'>
					<input type="number" data-key='z' value={props.property.z} onChange={onChange}/>
				</div>
			</div>
		</div>
	)
}

export default Vector3Drawer;