import React, { memo, ReactNode } from 'react';
import { prepareData, TreeData, TreeSourceData } from './treeUtils';

type IProps = {
	datas: TreeSourceData[],
	children: (data:any, ident: number) => ReactNode
}

const Tree = (props: IProps) => {
	var treeData = prepareData(props.datas);
	console.log(treeData);


	const renderRow = (data: any, i: number, ident: number) => {
		var childrens = [];

		childrens.push( props.children(data, ident) );
		childrens.push( data.children.map( (d, i) => renderRow(d, i, ident + 1) ));

		return childrens;
	}

	return (
		<div className='tree'>
			{ treeData.map( (d, i) => renderRow(d, i, 0) )}
		</div>
	)
}

export default memo(Tree);