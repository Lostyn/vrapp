import { SceneObject } from '../../../../types/scene';
import SceneService from '../../services/scene/sceneService';
import Quad from '../sceneObject/quad';
import BaseScene from './baseScene';

class Viewport extends BaseScene {
	_content: Map<string, Quad>;

	constructor(parent: HTMLElement, sceneService: SceneService) {
		super(parent);

		this._content = new Map<string, Quad>();

		sceneService.onSOAdded.register(this.onSOAdded_handle);
		sceneService.onSOUpdated.register(this.onSOUpdated_handler);
	}

	onSOAdded_handle = (so: SceneObject) => {
		switch (so.name) {
			case 'quad':
				var obj = new Quad(2, 1)
				this._content.set(so.instanceID, obj);
				this.scene.add(obj);

				this.onSOUpdated_handler(so);
				break;
		}
	}

	onSOUpdated_handler = (so: SceneObject) => {
		console.log(so.instanceID);
		const obj = this._content.get(so.instanceID);
		obj.position.set(so.transform.position.x, so.transform.position.y, so.transform.position.z);
		obj.rotation.set(so.transform.rotation.x * Math.PI / 180, so.transform.rotation.y * Math.PI / 180, so.transform.rotation.z * Math.PI / 180);
	}

	layout() {
		super.layout();

	}

	render = () => {
		super.render();
	}
}

export default Viewport;