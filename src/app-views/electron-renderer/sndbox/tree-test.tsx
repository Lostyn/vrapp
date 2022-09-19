import React, { Component } from 'react'
import { SceneObject } from '../../../types/scene';
import { createUUID } from '../../common/core/id';
import sample from '../../common/services/scene/sample';
import Tree from '../workench/components/tree/tree';
import SceneObjectLine from '../workench/parts/sceneObjects/sceneobjectsline';

type IState = {
	datas: SceneObject[];
}

export default class TreeTest extends Component<any, IState> {
	constructor(props) {
		super(props);

		this.state = {
			datas: sample()
		}
	}

	renderRow = (d: SceneObject, ident: number) => {

		return (
			<SceneObjectLine
				key={d.instanceID}
				selected={false}
				onClick={ () => { } }
				ident={ident}
				{ ...d }
			/>
		)
	}

	onTreeChange = (itemID, parentID) => {
		var datas = JSON.parse(JSON.stringify(this.state.datas));
		const obj = datas.find( o => o.instanceID == itemID);
		obj.parent = parentID;

		this.setState({datas})
	}

	render() {
		return (
			<Tree
				datas={this.state.datas}
				onChange={this.onTreeChange}
			>
				{ this.renderRow }
			</Tree>
		)
	}
}
