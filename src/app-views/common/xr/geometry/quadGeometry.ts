import { BufferGeometry, Float32BufferAttribute } from 'three';

class QuadGeometry extends BufferGeometry {
	constructor() {
		super();

		const vertices = [
			-0.5, 0.5, 0,
			0.5, 0.5, 0,
			0.5, -0.5, 0,
			-0.5, -0.5, 0
		]
		const normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		]

		const uvs = [
			0, 1,
			1, 1,
			1, 0,
			0, 0
		]

		const indices = [
			0, 1, 3,
			1, 2, 3
		]

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}
}

export default QuadGeometry;