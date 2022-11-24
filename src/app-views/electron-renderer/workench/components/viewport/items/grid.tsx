
import * as React from "react";
import { Color, DoubleSide } from 'three';



const Grid = (props) => {
	return (
		<mesh frustumCulled={false}>
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