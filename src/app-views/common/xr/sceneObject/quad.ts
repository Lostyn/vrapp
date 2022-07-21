import { Mesh, MeshBasicMaterial } from 'three';
import QuadGeometry from '../geometry/quadGeometry';

class Quad extends Mesh {
	constructor() {
		const material = new MeshBasicMaterial({ color: 0xffffff });
		const geometry = new QuadGeometry();
		super(geometry, material);
	}
}

export default Quad;