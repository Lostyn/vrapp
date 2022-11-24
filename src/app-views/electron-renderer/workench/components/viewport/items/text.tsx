import { Text as DreiText } from '@react-three/drei';
import React from 'react';
import { Color, Vector3 } from 'three';
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
			color={text.color.replace('0x', '#')}
			anchorX="center"
			anchorY="middle"
			fontSize={text.fontSize * 0.01}
		>
			{text.text}
			{props.children}
		</DreiText>
	)
}

export default Text;