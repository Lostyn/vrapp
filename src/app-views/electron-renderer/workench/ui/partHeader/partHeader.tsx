import React from 'react'

const PartHeader = (props) => {
	return (
		<div className='part-header'>
			<div>{props.children}</div>
		</div>
	)
}

export default PartHeader;