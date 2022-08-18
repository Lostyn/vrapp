import React from 'react'

type IProps = {
	label: string,
	onChange: (string) => void;
	property: string;
}

const StringDrawer = (props: IProps) => {

	const onChange = (evt) => {
		var t = parseInt(evt.target.value);
		props.onChange(evt.target.value);
	}

	return (
		<div className='ui-group'>
			<span className='ui-label'>{props.label}</span>
			<div className='ui-input'>
				<div className='ui-element ui-text-input'>
					<input type="text" value={props.property} onChange={onChange}/>
				</div>
			</div>
		</div>
	)
}

export default StringDrawer;