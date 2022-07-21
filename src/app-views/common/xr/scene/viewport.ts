import { Vector3 } from 'three';
import { SceneObject } from '../../../../types/scene';
import SceneService from '../../services/scene/sceneService';
import BaseScene from './baseScene';

class Viewport extends BaseScene {

	constructor(parent: HTMLElement, sceneService: SceneService) {
		super(parent);

		sceneService.onSOAdded.register(this.onSOAdded_handle);
	}

	onSOAdded_handle = (so: SceneObject) => {
		console.log(so);
	}

	layout() {
		super.layout();

	}

	render = () => {
		super.render();
	}
}

export default Viewport;