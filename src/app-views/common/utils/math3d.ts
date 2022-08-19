import { Euler, Matrix4, Quaternion, Vector3 } from 'three';

export function RotateAroundPivot(point: Vector3, rotation: Vector3): Vector3 {
	var qt = new Quaternion().setFromEuler(new Euler().setFromVector3(rotation));
	return MultiplyQuaternionByVector(qt, point);
}

export function MultiplyQuaternionByVector(q: Quaternion, v: Vector3): Vector3 {
	// Vector
	const x: number = v.x;
	const y: number = v.y;
	const z: number = v.z;

	// Quaternion
	const qx: number = q.x;
	const qy: number = q.y;
	const qz: number = q.z;
	const qw: number = q.w;

	// Quaternion * Vector
	const ix: number = qw * x + qy * z - qz * y;
	const iy: number = qw * y + qz * x - qx * z;
	const iz: number = qw * z + qx * y - qy * x;
	const iw: number = -qx * x - qy * y - qz * z;

	// Final Quaternion * Vector = Result
	return new Vector3(
		ix * qw + iw * -qx + iy * -qz - iz * -qy,
		iy * qw + iw * -qy + iz * -qx - ix * -qz,
		iz * qw + iw * -qz + ix * -qy - iy * -qx
	)
}