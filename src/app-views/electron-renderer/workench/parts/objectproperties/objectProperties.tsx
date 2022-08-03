import React, { useEffect, useState } from 'react'
import { SceneObject } from '../../../../../types/scene'
import { PropsWithService, withServices } from '../../../services/serviceContext'

type IProps = PropsWithService & {

}

const ObjectProperties = (props: IProps) => {
	const { sceneService } = props.services;

	const[ selected, setSelected ] = useState<SceneObject>(null);

	useEffect(() => {
		const onSelect = () => {
			const so = sceneService.content.find( o => o.instanceID == sceneService.selected)
			setSelected(so);
		}

		const unregister = [
			sceneService.onSelect.register(onSelect)
		];
		return () => unregister.forEach( u => u() );
	})

	if (selected == null) return <div id="object-properties"></div>
	return (
		<div id="object-properties">
			{selected.name}
		</div>
	);
}

export default withServices(ObjectProperties);