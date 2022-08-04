import React, { useState } from 'react'
import { Vector3 } from 'three'
import { PropsWithProperties, withProperties } from '../propertiesContext'
import Vector3Drawer from './vector3Drawer'

type IProps = PropsWithProperties & {
	onChange: (instanceId: string, patch:any) => void;
}

const TransformDrawer = (props: IProps) => {
	const {transform, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const onChangePosition = (pos: Vector3) => {
		props.onChange(instanceID, {
			transform: {
				position: pos,
				rotation: transform.rotation
			}
		})
	}

	const onChangeRotation = (rot:Vector3) => {
		props.onChange(instanceID, {
			transform: {
				position: transform.position,
				rotation: rot
			}
		})
	}

	return (
		<>
			<div className='property-header' onClick={() => setOpen(!open)}>
				<span>{open ? "-" : "+"} </span>
				Transform
			</div>
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