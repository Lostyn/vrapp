import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from "react";
import { SceneObject } from '../../../../../types/scene';
import { useServices } from '../../../services/serviceContext';
import Grid from './items/grid';
import ProceduralImage from './items/proceduralImage';

import "../../../shaders/gridMaterial"
import "../../../shaders/proceduralImageMaterial"
import { Get3DComponentFromType } from '../../../../common/utils/typeUtils';

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
	}, [sceneService]);

	const rootItems: SceneObject[] = items.filter( d => d.parent === "");

	const renderItems = (obj: SceneObject[]) => {
		return obj.map( o => {
			const childs = items.filter( it => it.parent === o.instanceID)

			const Cpn = Get3DComponentFromType(o);
			return (
				<Cpn key={o.instanceID} item={o}>
					{ childs.length > 0 && renderItems(childs) }
				</Cpn>
			)
		});
	}

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
				{ renderItems(rootItems) }
				<color attach="background" args={["#505050"]}/>
			</Canvas>
		</div>
	)
}

export default Viewport;