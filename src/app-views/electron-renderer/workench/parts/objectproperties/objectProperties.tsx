import React, { useEffect, useState } from 'react'
import { SceneObject } from '../../../../../types/scene'
import { AppServices } from '../../../../../types/viewService'
import { useServices } from '../../../services/serviceContext'
import PartHeader from '../../ui/partHeader/partHeader'
import ImageDrawer from './objectDrawer/component/imageDrawer'
import TransformDrawer from './objectDrawer/component/transformDrawer'
import StringDrawer from './objectDrawer/primitive/stringDrawer'
import PropertiesProvider from './propertiesContext'


type IState = {
	selected: SceneObject
}

const ObjectProperties = () => {

	const { sceneService } = useServices();

	const so = sceneService.content.find( o => o.instanceID == sceneService.selected);
	const [ selected, setSelected ] = useState<SceneObject>(so);
	const [ selectedName, setSelectedName ] = useState<string>(so && so.name);

	const onSelect = () => {
		const newSelection = sceneService.content.find( o => o.instanceID == sceneService.selected);
		setSelected({...newSelection});
		setSelectedName(newSelection.name);
	}

	const renderEmpty = () => {
		return <div/>;
	}

	useEffect( () => {
		const _unregister = [
			sceneService.onSelect.register(onSelect),
			sceneService.onSOUpdated.register(onSelect)
		];

		return () => {
			_unregister.forEach( u => u() );
		}
	}, [])

	const onNameChange = (value:string) => {
		sceneService.rpc_updateObject(selected.instanceID, { name: value })
	}

	const renderSelected = () => {

		return (
			<>
				<StringDrawer label='Name' property={selectedName} onChange={onNameChange}/>
				<PropertiesProvider properties={selected}>
					<TransformDrawer onChange={sceneService.rpc_updateObject} />
					<ImageDrawer onChange={sceneService.rpc_updateObject} />
				</PropertiesProvider>
			</>
		);
	}

  	return (
		<div id="object-properties">
			<PartHeader><i className='icon-code'/>Object Properties</PartHeader>
			{selected == null ? renderEmpty() : renderSelected()}
		</div>
	)
}


export default ObjectProperties;