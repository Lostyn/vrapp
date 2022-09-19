import cs from 'classnames';
import React, { memo, ReactNode, useRef, useState } from 'react';
import { prepareData, TreeData, TreeSourceData } from './treeUtils';

type IProps = {
	datas: TreeSourceData[],
	children: (data:any, ident: number) => ReactNode,
	onChange: (itemID: string, parentID: string) => void
}

const Tree = (props: IProps) => {
	var treeData = prepareData(props.datas);


	// const [dragItem, setDragItem] = useState<TreeSourceData>();

	const [overItem, setOverItem] = useState<string>();
	const [currentDrag, setCurrentDrag] = useState<string>();
	const [dropPos, setDropPos] = useState<string>();

	const onDragStart = (e, instanceID) => {
		setCurrentDrag(instanceID);
	}

	const onDragOver = (e, instanceID) => {
		if (currentDrag === instanceID) {
			setDropPos(undefined);
			return;
		}

		let el = e.target;
		while(!el.classList.contains('tree-row') && el.parentNode != undefined) {
			el = el.parentNode;
		}

		if (el != undefined) {
			setOverItem(instanceID);

			var y = e.pageY - el.getBoundingClientRect().y;
			if (y < 5) setDropPos('top');
			else if (el.getBoundingClientRect().height - y < 5) setDropPos('bottom');
			else setDropPos(undefined);
		}
	}

	const onDragLeave = (e, instanceID) => {
		let el = e.target;
		while(!el.classList.contains('tree-row') && el.parentNode != undefined) {
			el = el.parentNode;
		}

		if (overItem === el) {
			setOverItem(undefined);
		}
	}

	const onDrop = (e, instanceID) => {
		setCurrentDrag("");
		if (currentDrag === instanceID || currentDrag === undefined) return;

	}



	const renderRow = (data: any, i: number, ident: number) => {
		var childrens = [];

		var node = props.children(data, ident);
		var cx = cs('tree-row', {
			drag: data.instanceID === currentDrag,
			"drop-top": data.instanceID === overItem && dropPos === 'top',
			"drop-bottom": data.instanceID === overItem && dropPos === 'bottom',
		})

		childrens.push(
			<div className={cx} key={`drag_${data.instanceID}`}
				onDrag={ e => onDragStart(e, data.instanceID) }
				onDragOver={ e => onDragOver(e, data.instanceID) }
				onDragLeave={ e => onDragLeave(e, data.instanceID)}
				onDragEnd={e => onDrop(e, data.instanceID) }
				draggable
			>
				{ node }
			</div>
		);
		childrens.push( data.children.map( (d, i) => renderRow(d, i, ident + 1) ));

		return childrens;
	}

	console.log(dropPos);
	return (
		<div className='tree'>
			{ treeData && treeData.map( (d, i) => renderRow(d, i, 0) )}
		</div>
	)
}

export default memo(Tree);