import React, { useState } from 'react'
import { Color, Vector4 } from 'three'
import { PropsWithProperties, withProperties } from '../../propertiesContext'
import ColorDrawer from '../primitive/colorDrawer'
import NumberDrawer from '../primitive/numberDrawer'
import Vector4Drawer from '../primitive/vector4Drawer'
import ComponentHeader from '../ui/componentHeader'

type IProps = PropsWithProperties & {
	onChange: (instanceId: string, patch:any) => void;
}

const TextDrawer = (props: IProps) => {
	const {image, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const getPatch = (key, value) => {
		return {
			image: {
				...image,
				[key]: value
			}
		}
	}

	return (
		<>
			<ComponentHeader open={open} setOpen={setOpen}>Text</ComponentHeader>
			{ open && (
				<>

				</>
			)}
		</>
	)
}

export default withProperties(TextDrawer, ['text']);