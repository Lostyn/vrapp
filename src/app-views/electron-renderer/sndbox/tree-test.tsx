import React, { useState } from 'react'
import { ControlledTreeEnvironment, DraggingPosition, InteractionMode, Tree, TreeItem, TreeItemIndex } from 'react-complex-tree';
import sample from '../../common/services/scene/sample';

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

export default function TreeTest () {
	const [ datas, setDatas ] = useState(sample());
	const [ expandedItems, setExpandedItems ] = useState([]);
	const [ selectedItems, setSelectedItems ] = useState([]);

	const InteractionProps = {
		defaultInteractionMode: InteractionMode.ClickArrowToExpand,
		canDragAndDrop: true,
		canReorderItems: true,
		canDropOnItemWithChildren: true,
		canDropOnItemWithoutChildren: true,
	}

	const OnDrop = (items: TreeItem[], target: DraggingPosition) => {
		const nd = JSON.parse(JSON.stringify(datas));

		for(const item of items) {
			const obj = nd.find( o => o.instanceID === item.index);

			if (target.targetType === 'item') {
				if(target.targetItem === obj.instanceID) {
					// NOOP
				} else {
					obj.parent = target.targetItem;
				}
			} else {
				if (target.parentItem === 'root')
					obj.parent = '';
				else
					obj.parent = target.parentItem;
			}
		}

		setDatas(nd);
	}

	return (
		<ControlledTreeEnvironment
			{ ...InteractionProps }

			items={prepare(datas)}
			getItemTitle={item => item.data}
			viewState={{
				['tree-1']: {
					expandedItems,
					selectedItems
				}
			}}

			onExpandItem={ item => setExpandedItems([...expandedItems, item.index])}
			onCollapseItem={ item => setExpandedItems(expandedItems.filter(eii => eii !== item.index))}
			onSelectItems={items => setSelectedItems(items)}
			onDrop={OnDrop}
		>
			<Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
		</ControlledTreeEnvironment>
	)
}
