import { Box, Text as DreiText } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { TextObject } from '../../../../../../types/scene';


type IProps = {
	item:TextObject,
	children: any
}

const Text = (props:IProps) => {
	const { transform, text } = props.item;

	const getArray: (p:Vector3) => [x:number, y:number, z:number] = (p: Vector3) => {return [ p.x, p.y, p.z ]};
	return (
		<DreiText
			position={getArray(transform.position)}
			rotation={getArray(transform.rotation)}
			frustumCulled={false}
			color="black"
			anchorX="center"
			anchorY="middle"
		>
			{text.text}
			{props.children}
		</DreiText>
	)
}

export default Text;