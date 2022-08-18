import React, { Component, useState } from 'react'
import NumericInput from '../inputs/numeric-input';


type IProps = {
	label: string,
	onChange: (float) => void;
	property: number;
	placeholder?: string
}

const NumberDrawer  = (props: IProps) => {

	const { label, onChange, placeholder, property} = props;

	return (
		<div className='ui-group'>
			<span className='ui-label'>{label}</span>
			<div className='ui-input ui-vector-input'>
				<NumericInput
					placeholder={placeholder}
					value={property.toString()}
					onChange={onChange}
				/>

			</div>
		</div>
	)
}

export default NumberDrawer;