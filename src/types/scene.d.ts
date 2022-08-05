import { Color, Vector3, Vector4 } from 'three';

export type SceneObject = {
	instanceID: string,
	name: string,
	transform: Transform;
	image: Image;
}

export type Transform = {
	position: Vector3;
	rotation: Vector3;
	scale: Vector3;
}
export type Image = {
	width: number;
	height: number;
	radius: Vector4;
	borderWidth: number;
	color: string;
}