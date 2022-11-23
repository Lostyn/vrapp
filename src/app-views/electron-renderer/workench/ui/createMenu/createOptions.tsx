import React from 'react'
import { createUUID } from '../../../../common/core/id';
import { useServices } from '../../../services/serviceContext';

const CreateOptions = (props) => {
	const { sceneService } = useServices();

	const createProceduralImage = () => {
		sceneService.rpc_createObject('quad', createUUID());
	}



	return (
		<div className='create-options'>
			<button onClick={createProceduralImage}>Procédural Image</button>
		</div>
	)
}

export default CreateOptions;