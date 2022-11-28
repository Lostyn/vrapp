import { Vector3, Vector4 } from 'three';

export type SceneObject = {
	instanceID: string,
	parent: string,
	name: string,
	transform: Transform;
}

export type SceneObjectId = 'shape' | 'text' | 'Image';
export type AllSceneObject = SceneObject | ShapeObject | TextObject;

export type ShapeObject = SceneObject & {
	shape: Shape;
}

export type TextObject = SceneObject & {
	text: Text
}

export type ImageObject = SceneObject & {

}

export type Transform = {
	position: Vector3;
	rotation: Vector3;
}
export type Shape = {
	width: number;
	height: number;
	radius: Vector4;
	borderWidth: number;
	color: string;
}

export type Text = {
	text: string,
	color: string,
	fontSize: number
}