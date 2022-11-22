
import * as React from "react";
import { Color, ColorRepresentation, DoubleSide } from 'three';
import { Box, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber'



const Grid = (props) => {
	return (
		<mesh>
			<planeGeometry args={[2, 2, 1, 1]}/>
			<gridMaterial
				uSize1={1}
				uSize2={10}
				uColor={new Color(0xffffff)}
				uDistance={100}
				transparent={true}
				side={DoubleSide}
			/>
		</mesh>
	)
}

export default Grid;