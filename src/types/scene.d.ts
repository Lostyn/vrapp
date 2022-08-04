import { Vector3 } from 'three';

export type SceneObject = {
	instanceID: string,
	name: string,
	transform: Transform;
}

export type Transform = {
	position: Vector3;
	rotation: Vector3;
}