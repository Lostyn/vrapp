import React, { useState } from 'react'
import { Vector3 } from 'three'
import { PropsWithProperties, withProperties } from '../propertiesContext'
import NumberDrawer from './numberDrawer'
import Vector3Drawer from './vector3Drawer'

type IProps = PropsWithProperties & {
	onChange: (instanceId: string, patch:any) => void;
}

const ImageDrawer = (props: IProps) => {
	const {image, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const getPath = (key, value) => {
		return {
			image: {
				...image,
				[key]: value
			}
		}
	}

	const onWidthChange = (value) => {
		props.onChange(instanceID, getPath('width', value));
	}

	const onHeightChange = (value) => {
		props.onChange(instanceID, getPath('height', value));
	}

	const onBorderChange = (value) => {
		props.onChange(instanceID, getPath('borderWidth', value));
	}

	return (
		<>
			<div className='property-header' onClick={() => setOpen(!open)}>
				<span>{open ? "-" : "+"} </span>
				Image
			</div>
			{ open && (
				<>
					<NumberDrawer label='Width' onChange={onWidthChange} property={image.width} />
					<NumberDrawer label='Height' onChange={onHeightChange} property={image.height} />
					<NumberDrawer label='Border width' onChange={onBorderChange} property={image.borderWidth} />
				</>
			)}
		</>
	)
}

export default withProperties(ImageDrawer, ['image']);