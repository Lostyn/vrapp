import React, { useEffect, useState } from "react";
import { SceneObject } from '../../../../../types/scene';
import { createUUID } from '../../../../common/core/id';
import { PropsWithService, withServices } from '../../../services/serviceContext';
import PartHeader from '../../ui/partHeader/partHeader';
import SceneObjectLine from './sceneobjectsline';

type IProps = PropsWithService & {

}

const SceneObjects = (props: IProps) => {
	const { sceneService } = props.services;

	const createTest = () => {
		sceneService.rpc_createObject('quad', createUUID());
	};

	const [selected, setSelected] = useState<string>("");
	const selectItem = (instanceId: string) => {
		sceneService.selectObject(instanceId);
	}

	const [ items, setItems ] = useState<SceneObject[]>(sceneService.content);
	const [ tic, setTic ] = useState<boolean>();

	useEffect( () => {
		const onAdd = () => { setItems(sceneService.content); }
		const onSelect = () => { setSelected(sceneService.selected); }
		const onUpdate = () => setTic(!tic);

		const unregister = [
			sceneService.onSOAdded.register(onAdd),
			sceneService.onSelect.register(onSelect),
			sceneService.onSOUpdated.register(onUpdate)
		];
		return () => unregister.forEach( u => u() );
	})

	return (
		<div id="scene-objects">
			<PartHeader><i className='icon-list'/>Scene Objects</PartHeader>
			{ items.map( so =>
					<SceneObjectLine
						key={so.instanceID}
						selected={so.instanceID == selected}
						onClick={ () => selectItem(so.instanceID) }
						{...so}
					/>
			)}
			<button onClick={createTest}>Create</button>
		</div>
	)
}

export default withServices(SceneObjects);