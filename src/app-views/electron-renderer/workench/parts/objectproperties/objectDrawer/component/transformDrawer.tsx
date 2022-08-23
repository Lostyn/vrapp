import React, { useState } from 'react'
import { Vector3 } from 'three'
import { PropsWithProperties, withProperties } from '../../propertiesContext'
import Vector3Drawer from '../primitive/vector3Drawer'
import ComponentHeader from '../ui/componentHeader'

type IProps = PropsWithProperties & {
	onChange: (instanceId: string, patch:any) => void;
}

const TransformDrawer = (props: IProps) => {
	const {transform, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const getPath = (key, value) => {
		return {
			transform: {
				...transform,
				[key]: value
			}
		}
	}

	const onChangePosition = (pos: Vector3) => {
		props.onChange(instanceID, getPath('position', pos));
	}

	const onChangeRotation = (rot:Vector3) => {
		props.onChange(instanceID, getPath('rotation', rot));
	}

	return (
		<>
			<ComponentHeader open={open} setOpen={setOpen}>Transform</ComponentHeader>
			{ open && (
				<>
					<Vector3Drawer label="Position" onChange={onChangePosition} property={transform.position} />
					<Vector3Drawer label="Rotation" onChange={onChangeRotation} property={transform.rotation} />
				</>
			)}
		</>
	)
}

export default withProperties(TransformDrawer, ['transform']);