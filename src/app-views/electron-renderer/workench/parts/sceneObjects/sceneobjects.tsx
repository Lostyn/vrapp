import React, { useEffect, useState } from "react";
import { SceneObject } from '../../../../../types/scene';
import { createUUID } from '../../../../common/core/id';
import { PropsWithService, withServices } from '../../../services/serviceContext';
import Tree from '../../components/tree/tree';
import { TreeData } from '../../components/tree/treeUtils';
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
			sceneService.onSOUpdated.register(onUpdate),
			sceneService.onHierarchyChanged.register(onUpdate)
		];
		return () => unregister.forEach( u => u() );
	})

	const Row = (d: SceneObject, ident: number) => {
		return (
			<SceneObjectLine
				key={d.instanceID}
				selected={d.instanceID == selected}
				onClick={ () => selectItem(d.instanceID)}
				ident={ident}
				{ ...d }
			/>
		)
	}

	const onTreeChange = (itemID, parentID) => {
		sceneService.rpc_setParent(itemID, parentID);
	}

	return (
		<div id="scene-objects">
			<PartHeader><i className='icon-list'/>Scene Objects</PartHeader>
			<Tree
				datas={items}
				onChange={onTreeChange}>
				{ Row }
			</Tree>
			<button onClick={createTest}>Create</button>
		</div>
	)
}

export default withServices(SceneObjects);