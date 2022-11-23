import { Vector3, Vector4 } from 'three';
import { SceneObject } from '../../../../types/scene';

export const DefaultSceneObject = (instanceID: string, name: string): SceneObject => ({
	instanceID: instanceID,
	parent: '',
	name: name,
	transform: {
		position: new Vector3(),
		rotation: new Vector3()
	},
})

export const DefaultImageObject = {
	image: {
		width: 1,
		height: 1,
		radius: new Vector4(0, 0, 0, 0),
		borderWidth: 0,
		color: "0xffffff"
	}
}

export const DefaultTextObject = {
	text: {
		text: "New text"
	}
}