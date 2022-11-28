import React from 'react'
import { createUUID } from '../../../../common/core/id';
import { useServices } from '../../../services/serviceContext';

const CreateOptions = (props) => {
	const { sceneService } = useServices();

	const createProceduralImage = () => {
		sceneService.rpc_createObject('shape', createUUID());
	}

	const createText = () => {
		sceneService.rpc_createObject('text', createUUID());
	}

	return (
		<div className='create-options'>
			<button onClick={createProceduralImage}>Procedural Image</button>
			<button onClick={createText}>Text</button>
		</div>
	)
}

export default CreateOptions;