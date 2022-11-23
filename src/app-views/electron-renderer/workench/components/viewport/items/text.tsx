import { Box } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { TextObject } from '../../../../../../types/scene';


type IProps = {
	item:TextObject,
	children: any
}

const Text = (props:IProps) => {
	const { transform } = props.item;

	const getArray: (p:Vector3) => [x:number, y:number, z:number] = (p: Vector3) => {return [ p.x, p.y, p.z ]};
	return (
		<Box
			position={getArray(transform.position)}
			rotation={getArray(transform.rotation)}
			frustumCulled={false}
		>
			{props.children}
		</Box>
	)
}

export default Text;