import React, { useEffect, useState } from "react";
import { SceneObject } from '../../../../../types/scene';
import { PropsWithService, withServices } from '../../../services/serviceContext';
import SceneObjectLine from './sceneobjectsline';

type IProps = PropsWithService & {

}

const SceneObjects = (props: IProps) => {
	const { sceneService } = props.services;

	const [ items, setItems ] = useState<SceneObject[]>([]);
	const createTest = () => {
		sceneService.rpc_createObject('quad');
	};

	useEffect( () => {
		const onAdd = () => {
			setItems(sceneService.content);
		}

		const unregister = sceneService.onSOAdded.register(onAdd);
		return unregister;
	})

	return (
		<div id="sceneobjects">
			{ items.map( so => <SceneObjectLine key={so.instanceID} {...so} />)}
			<button onClick={createTest}>Create</button>
		</div>
	)
}

export default withServices(SceneObjects);