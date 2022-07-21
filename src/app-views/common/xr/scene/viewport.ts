import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
import { SceneObject } from '../../../../types/scene';
import SceneService from '../../services/scene/sceneService';
import BaseScene from './baseScene';

class Viewport extends BaseScene {
	_content: Map<string, Mesh>;

	constructor(parent: HTMLElement, sceneService: SceneService) {
		super(parent);

		this._content = new Map<string, Mesh>();
		sceneService.onSOAdded.register(this.onSOAdded_handle);
	}

	onSOAdded_handle = (so: SceneObject) => {
		switch (so.name) {
			case 'quad':
				const geometry = new PlaneGeometry(1, 1, 1, 1);
				const material = new MeshBasicMaterial({ color: 0xfff });

				var obj = new Mesh(geometry, material);
				obj.position.set(so.transform.x, so.transform.y, so.transform.z);

				this._content.set(so.instanceID, obj);
				this.scene.add(obj);
				break;
		}
	}

	layout() {
		super.layout();

	}

	render = () => {
		super.render();
	}
}

export default Viewport;