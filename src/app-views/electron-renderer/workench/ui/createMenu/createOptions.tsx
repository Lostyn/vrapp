import React from 'react'
import { createUUID } from '../../../../common/core/id';
import { useServices } from '../../../services/serviceContext';

const CreateOptions = (props) => {
	const { sceneService } = useServices();

	const createShape = () => {
		sceneService.rpc_createObject('shape', createUUID());
	}

	const createText = () => {
		sceneService.rpc_createObject('text', createUUID());
	}

	const createImage = () => {
		sceneService.rpc_createObject('image', createUUID());
	}

	return (
		<div className='create-options'>
			<button onClick={createShape}>Shape</button>
			<button onClick={createText}>Text</button>
			<button onClick={createImage}>Image</button>
		</div>
	)
}

export default CreateOptions;