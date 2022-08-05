import React from 'react'

type IProps = {
	label: string,
	onChange: (float) => void;
	property: number;
}

const NumberDrawer = (props: IProps) => {

	const onChange = (evt) => {
		props.onChange(parseFloat(evt.target.value));
	}

	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input ui-vector-input'>
				<div className='ui-element ui-numeric-input'>
					<input type="number" value={props.property} onChange={onChange}/>
				</div>
			</div>
		</div>
	)
}

export default NumberDrawer;