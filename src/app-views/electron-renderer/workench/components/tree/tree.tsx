import React, { memo, ReactNode, useRef, useState } from 'react';
import { prepareData, TreeData, TreeSourceData } from './treeUtils';

type IProps = {
	datas: TreeSourceData[],
	children: (data:any, ident: number) => ReactNode,
	onChange: (itemID: string, parentID: string) => void
}

const Tree = (props: IProps) => {
	var treeData = prepareData(props.datas);


	const [dragItem, setDragItem] = useState<TreeSourceData>();
	const [overItem, setOverItem] = useState<TreeSourceData>();

	const dragStart = (e, instanceID) => {
		var item = props.datas.find( o => o.instanceID == instanceID);
		setDragItem(item);
	}

	const dragEnter = (e, instanceID) => {
		if (instanceID != dragItem.instanceID) {
			var itemO = props.datas.find( o => o.instanceID == instanceID);
			if (itemO.parent != dragItem.instanceID) {
				setOverItem(itemO);
			}
		}
	}

	const dragExit = (e, instanceID) => {
		if (overItem && instanceID == overItem.instanceID) {
			setOverItem(null);
		}
	}

	const dragOver = (e, instanceID) => {
		e.preventDefault();
	}

	const dragEnd = (e) => {
		var parentID = overItem != null ? overItem.instanceID : '';
		if (dragItem.parent != parentID)
			props.onChange(dragItem.instanceID, parentID);
	}


	const renderRow = (data: any, i: number, ident: number) => {
		var childrens = [];

		var node = props.children(data, ident);
		childrens.push(
			<div className='tree-row' key={`drag_${data.instanceID}`}
				onDragStart={ e => dragStart(e, data.instanceID)}
				onDragEnter={ e => dragEnter(e, data.instanceID)}
				onDragOver={ e => dragOver(e, data.instanceID)}
				onDragLeave={e => dragExit(e, data.instanceID)}
				onDragEnd={ dragEnd }
				draggable
			>
				{ node }
			</div>
		);
		childrens.push( data.children.map( (d, i) => renderRow(d, i, ident + 1) ));

		return childrens;
	}

	return (
		<div className='tree'>
			{ treeData && treeData.map( (d, i) => renderRow(d, i, 0) )}
		</div>
	)
}

export default memo(Tree);