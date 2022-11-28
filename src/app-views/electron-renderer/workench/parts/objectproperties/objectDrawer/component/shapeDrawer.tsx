import React, { useState } from 'react'
import { Color, Vector4 } from 'three'
import { ShapeObject } from '../../../../../../../types/scene'
import { PropsWithProperties, withProperties } from '../../propertiesContext'
import ColorDrawer from '../primitive/colorDrawer'
import NumberDrawer from '../primitive/numberDrawer'
import Vector4Drawer from '../primitive/vector4Drawer'
import ComponentHeader from '../ui/componentHeader'

type IProps = ShapeObject & {
	onChange: (instanceId: string, patch:any) => void;
}

const ShapeDrawer = (props: IProps) => {
	const {shape, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const getPatch = (key, value) => {
		return {
			shape: {
				...shape,
				[key]: value
			}
		}
	}

	const onWidthChange = (value) => {
		props.onChange(instanceID, getPatch('width', value));
	}

	const onHeightChange = (value) => {
		props.onChange(instanceID, getPatch('height', value));
	}

	const onBorderChange = (value) => {
		props.onChange(instanceID, getPatch('borderWidth', value));
	}

	const onRadiusChange = (value: Vector4) => {
		props.onChange(instanceID, getPatch('radius', value));
	}

	const onColorChange = (value: Color) => {
		props.onChange(instanceID, getPatch('color', value));
	}

	return (
		<>
			<ComponentHeader open={open} setOpen={setOpen}>Image</ComponentHeader>
			{ open && (
				<>
					<ColorDrawer label='Color' onChange={onColorChange} property={shape.color} />
					<NumberDrawer label='Width' onChange={onWidthChange} property={shape.width}/>
					<NumberDrawer label='Height' onChange={onHeightChange} property={shape.height} />
					<Vector4Drawer label='Radius' onChange={onRadiusChange} property={shape.radius} />
					<NumberDrawer label='Border width' onChange={onBorderChange} property={shape.borderWidth} />
				</>
			)}
		</>
	)
}

export default withProperties(ShapeDrawer, ['shape']);