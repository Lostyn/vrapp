import { BufferAttribute, BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial, Vector2, Vector3 } from 'three';
import QuadGeometry from '../geometry/quadGeometry';

class Vertice {
	pos: Vector3;

	uv: Vector2;
	uv2: Vector2;
	uv3: Vector2;
	uv4: Vector2;

	constructor(x: number, y: number, u: number, v: number) {
		this.pos = new Vector3(x, y, 0);
		this.uv = new Vector2(u, v);
	}

	setPosition(x: number, y: number) {
		this.pos.x = x;
		this.pos.y = y;
	}

	posArray() {
		return [this.pos.x, this.pos.y, this.pos.z];
	}
}

class Quad extends Mesh {

	width: number;
	height: number;

	vertices: Vertice[] = [
		new Vertice(0, 0, 0, 1),
		new Vertice(0, 0, 1, 1),
		new Vertice(0, 0, 0, 0),
		new Vertice(0, 0, 1, 0)
	]

	constructor(width: number, height: number) {
		const material = new MeshBasicMaterial({ color: 0xffffff });
		const geometry = new BufferGeometry();
		super(geometry, material);

		this.width = width;
		this.height = height;

		this.geometry.setIndex([0, 1, 2, 0, 2, 3]);
		this.updateVertex();
	}

	updateVertex() {
		const w = this.width * 0.5;
		const h = this.height * 0.5;

		this.vertices[0].setPosition(-w, h);
		this.vertices[1].setPosition(w, h);
		this.vertices[2].setPosition(w, -h);
		this.vertices[3].setPosition(-w, -h);

		var positions = [];
		for (let i = 0; i < this.vertices.length; i++) {
			positions.push(...this.vertices[i].posArray());
		}
		this.geometry.attributes.position = new Float32BufferAttribute(positions, 3)
	}
}

export default Quad;