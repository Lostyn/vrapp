import { Vector3, Vector4 } from 'three';
import { SceneObject } from '../../../../types/scene';
import { createUUID } from '../../core/id';

const sample: SceneObject[] = [
	{
		instanceID: createUUID(),
		name: 'a',
		transform: {
			position: new Vector3(-1.3, 0, 0),
			rotation: new Vector3(),
			scale: new Vector3(1, 1, 1)
		},
		image: {
			width: 1,
			height: 1,
			radius: new Vector4(),
			borderWidth: 0,
			color: '#ffffff'
		}
	},
	{
		instanceID: createUUID(),
		name: 'b',
		transform: {
			position: new Vector3(),
			rotation: new Vector3(),
			scale: new Vector3(1, 1, 1)
		},
		image: {
			width: 1,
			height: 1,
			radius: new Vector4(),
			borderWidth: 0,
			color: '#ffffff'
		}
	},
	{
		instanceID: createUUID(),
		name: 'c',
		transform: {
			position: new Vector3(1.3, 0, 0),
			rotation: new Vector3(),
			scale: new Vector3(1, 1, 1)
		},
		image: {
			width: 1,
			height: 1,
			radius: new Vector4(),
			borderWidth: 0,
			color: '#ffffff'
		}
	}
]

export default sample;