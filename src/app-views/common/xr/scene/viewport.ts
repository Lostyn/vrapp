import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
import { SceneObject } from '../../../../types/scene';
import SceneService from '../../services/scene/sceneService';
import Quad from '../sceneObject/quad';
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
				var obj = new Quad(2, 1)
				obj.position.set(so.transform.x, so.transform.y, so.transform.z);
				obj.rotation.set(0, 0, 0);

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