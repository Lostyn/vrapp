import React, { useEffect, useState } from 'react'
import { SceneObject } from '../../../../../types/scene'
import { PropsWithService, withServices } from '../../../services/serviceContext'
import PartHeader from '../../ui/partHeader/partHeader'
import ImageDrawer from './objectDrawer/imageDrawer'
import TransformDrawer from './objectDrawer/transformDrawer'
import PropertiesProvider from './propertiesContext'


type IState = {
	selected: SceneObject
}

class ObjectProperties extends React.Component<PropsWithService, IState> {
	_unregister: {(): void}[];

	constructor(props: PropsWithService) {
		super(props);

		const {sceneService} = props.services;
		const so = sceneService.content.find( o => o.instanceID == sceneService.selected);

		this.state = {
			selected: so
		}
	}

	onSelect = () => {
		const {sceneService} = this.props.services;
		const selected = sceneService.content.find( o => o.instanceID == sceneService.selected);
		this.setState({selected})
	}

	renderEmpty = () => {
		return <div/>;
	}

	componentDidMount() {
		const {sceneService} = this.props.services;

		this._unregister = [
			sceneService.onSelect.register(this.onSelect),
			sceneService.onSOUpdated.register(this.onSelect)
		];
	}

	componentWillUnmount(): void {
		this._unregister.forEach( u => u() );
	}

	renderSelected = () => {
		const { selected } = this.state;
		const {sceneService} = this.props.services;

		return (
			<>
				<div className='object-name'>{selected.name}</div>
				<PropertiesProvider properties={selected}>
					<TransformDrawer onChange={sceneService.rpc_updateObject} />
					<ImageDrawer onChange={sceneService.rpc_updateObject} />
				</PropertiesProvider>
			</>
		);
	}

  render() {
	const { selected } = this.state;
	return (
		<div id="object-properties">
			<PartHeader>Object Properties</PartHeader>
			{selected == null ? this.renderEmpty() : this.renderSelected()}
		</div>
	)
  }
}


export default withServices(ObjectProperties);