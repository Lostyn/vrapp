import { Vector3, Vector4 } from 'three';
import { SceneObject } from '../../../../types/scene';
import { createUUID } from '../../core/id';

const sample = (): SceneObject[] => {
	var id1 = createUUID();
	var id2 = createUUID();
	var id3 = createUUID();
	var id4 = createUUID();
	var id5 = createUUID();

	return [
		{
			instanceID: id1,
			parent: '',
			name: '1',
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
			instanceID: id2,
			parent: id1,
			name: '1-1',
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
			instanceID: id5,
			parent: id1,
			name: '1-2',
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
			instanceID: id4,
			parent: id2,
			name: '1-1-1',
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
			instanceID: id3,
			parent: '',
			name: '2',
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
}

export default sample;