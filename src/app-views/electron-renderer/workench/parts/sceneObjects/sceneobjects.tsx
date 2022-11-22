import React, { useEffect, useState } from "react";
import { ControlledTreeEnvironment, DraggingPosition, InteractionMode, Tree, TreeItem, TreeItemIndex } from 'react-complex-tree';
import { SceneObject } from '../../../../../types/scene';
import { createUUID } from '../../../../common/core/id';
import { useServices } from '../../../services/serviceContext';
import PartHeader from '../../ui/partHeader/partHeader';

type IProps = {

}

const prepare = (datas): Record<TreeItemIndex, TreeItem> => {
	const result: Record<TreeItemIndex, TreeItem> = {
		root: {
			index: 'root',
			hasChildren: true,
			data: 'root',
			children: datas.filter(d => d.parent === "").map( o => o.instanceID)
		}
	}

	for(const item of datas) {
		const children = datas.filter( d => d.parent == item.instanceID).map( o => o.instanceID);
		result[item.instanceID] = {
			index: item.instanceID,
			hasChildren: children.length > 0,
			children,
			data: item.name
		}
	}
	return result;
}

const SceneObjects = (props: IProps) => {
	const { sceneService } = useServices();

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

	const onTreeChange = (itemID, parentID) => {
		sceneService.rpc_setParent(itemID, parentID);
	}

	const [ expandedItems, setExpandedItems ] = useState([]);


	const InteractionProps = {
		defaultInteractionMode: InteractionMode.ClickArrowToExpand,
		canDragAndDrop: true,
		canReorderItems: true,
		canDropOnItemWithChildren: true,
		canDropOnItemWithoutChildren: true,
		showLiveDescription: false
	}

	const OnDrop = (items: TreeItem[], target: DraggingPosition) => {


		for(const item of items) {
			if (target.targetType === 'item') {
				if(target.targetItem === item.index) {
					// NOOP
				} else {
					onTreeChange(item.index, target.targetItem);
				}
			} else {
				if (target.parentItem === 'root') {
					onTreeChange(item.index, '');
				} else {
					onTreeChange(item.index, target.parentItem);
				}
			}
		}
	}

	return (
		<div id="scene-objects">
			<PartHeader><i className='icon-list'/>Scene Objects</PartHeader>

			<ControlledTreeEnvironment
				{ ...InteractionProps }

				items={prepare(items)}
				getItemTitle={item => item.data}
				viewState={{
					['tree-1']: {
						expandedItems,
						selectedItems: [selected]
					}
				}}

				onExpandItem={ item => setExpandedItems([...expandedItems, item.index])}
				onCollapseItem={ item => setExpandedItems(expandedItems.filter(eii => eii !== item.index))}
				onSelectItems={items => selectItem(items[0] as string)}
				onDrop={OnDrop}
			>
				<Tree treeId="tree-1" rootItem="root"/>
			</ControlledTreeEnvironment>
			<button onClick={createTest}>Create</button>
		</div>
	)
}

export default SceneObjects;