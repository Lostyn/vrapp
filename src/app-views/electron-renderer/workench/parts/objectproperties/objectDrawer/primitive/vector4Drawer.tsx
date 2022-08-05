import React from 'react'
import { Vector4 } from 'three';

type IProps = {
	label: string,
	onChange: (Vector4) => void;
	property: Vector4;
	placeHolders?: string[]
}

const Vector4Drawer = (props: IProps) => {

	const holders = props.placeHolders || ['x', 'y', 'z', 'w'];

	const onChange = (evt) => {
		const attr = evt.target.getAttribute('data-key');
		const result = new Vector4(props.property.x, props.property.y, props.property.z, props.property.w);
		result[attr] = parseFloat(evt.target.value);
		props.onChange(result);
	}

	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input ui-vector-input'>
				<div className='ui-element ui-numeric-input' placeholder={holders[0]}>
					<input type="number" data-key='x' value={props.property.x} onChange={onChange}/>
				</div>
				<div className='ui-element ui-numeric-input' placeholder={holders[1]}>
					<input type="number" data-key='y' value={props.property.y} onChange={onChange}/>
				</div>
				<div className='ui-element ui-numeric-input' placeholder={holders[2]}>
					<input type="number" data-key='z' value={props.property.z} onChange={onChange}/>
				</div>
				<div className='ui-element ui-numeric-input' placeholder={holders[3]}>
					<input type="number" data-key='w' value={props.property.w} onChange={onChange}/>
				</div>
			</div>
		</div>
	)
}

export default Vector4Drawer;