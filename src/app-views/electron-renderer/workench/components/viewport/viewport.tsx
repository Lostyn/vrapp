import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from "react";
import { SceneObject } from '../../../../../types/scene';
import { useServices } from '../../../services/serviceContext';
import Grid from './items/grid';
import Quad from './items/quad';

import "../../../shaders/gridMaterial"
import "../../../shaders/proceduralImageMaterial"

type IProps = {

}

const Viewport = (props: IProps) => {
	const {sceneService} = useServices();

	const [items, setItems] = useState<SceneObject[]>([]);
	useEffect( () => {
		const update = (so) => {
			setItems([...sceneService.content]);
		};

		const _unregister = [
			sceneService.onSOAdded.register(update),
			sceneService.onSOUpdated.register(update)
		];

		return () => {
			_unregister.forEach( u => u() );
		}
	}, [sceneService])

	return (
		<div id="viewport">
			<Canvas camera={{position: [0, 1.7, 3]}}>
				<OrbitControls target={[0, 0, 0]}/>
				<GizmoHelper
					alignment="top-right"
					margin={[80, 80]}
				>
					<GizmoViewport/>
				</GizmoHelper>
				<Grid />
				{ items.map( item => <Quad key={item.instanceID} item={item} /> )}
				<color attach="background" args={["#505050"]}/>
			</Canvas>
		</div>
	)
}

export default Viewport;