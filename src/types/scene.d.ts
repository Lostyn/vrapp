import { Vector3, Vector4 } from 'three';

export type SceneObject = {
	instanceID: string,
	parent: string,
	name: string,
	transform: Transform;
}

export type SceneObjectId = 'proceduralImage' | 'text';
export type AllSceneObject = SceneObject | ProceduralImageObject | TextObject;

export type ProceduralImageObject = SceneObject & {
	image: ProceduralImage;
}

export type TextObject = SceneObject & {
	text: Text
}

export type Transform = {
	position: Vector3;
	rotation: Vector3;
}
export type ProceduralImage = {
	width: number;
	height: number;
	radius: Vector4;
	borderWidth: number;
	color: string;
}