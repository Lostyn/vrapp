import React from 'react'
import { Vector3 } from 'three'
import { PropsWithProperties, withProperties } from '../propertiesContext'
import Vector3Drawer from './vector3Drawer'

type IProps = PropsWithProperties & {
	onChange: (instanceId: string, patch:any) => void;
}

const TransformDrawer = (props: IProps) => {
	const {transform, instanceID} = props;

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
			<div>Transform</div>
			<Vector3Drawer onChange={onChangePosition} property={transform.position} />
			<Vector3Drawer onChange={onChangeRotation} property={transform.rotation} />
		</>
	)
}

export default withProperties(TransformDrawer, ['transform']);