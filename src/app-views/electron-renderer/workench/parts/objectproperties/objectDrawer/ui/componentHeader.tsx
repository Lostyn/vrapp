import React from 'react'

type IProps = {
	open: boolean,
	setOpen: (boolean) => void,
	children: any
}

const ComponentHeader = (props: IProps) => {
	const { open, setOpen } = props;

	return (
		<div className='property-header' onClick={() => setOpen(!open)}>
			<span>{open ? <i className='icon-arrow-down'/> : <i className='icon-play'/>} </span>
			{props.children}
		</div>
	)
}

export default ComponentHeader;