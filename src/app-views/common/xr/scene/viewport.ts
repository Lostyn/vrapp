import { Vector3 } from 'three';
import { SceneObject } from '../../../../types/scene';
import SceneService from '../../services/scene/sceneService';
import Quad from '../sceneObject/quad';
import BaseScene from './baseScene';

class Viewport extends BaseScene {
	_content: Map<string, Quad>;
	_sceneService: SceneService;

	constructor(parent: HTMLElement, sceneService: SceneService) {
		super(parent);

		this._content = new Map<string, Quad>();
		this._sceneService = sceneService;

		sceneService.onSOAdded.register(this.onSOAdded_handle);
		sceneService.onSOUpdated.register(this.onSOUpdated_handler);

		this.populate(sceneService.content);
	}

	populate(objects: SceneObject[]) {

		for (var obj of objects) {
			this.onSOAdded_handle(obj);
		}
	}

	onSOAdded_handle = (so: SceneObject) => {
		var obj = new Quad(2, 1)
		this._content.set(so.instanceID, obj);
		this.scene.add(obj);

		this.onSOUpdated_handler(so);
	}

	onSOUpdated_handler = (so: SceneObject) => {
		const obj = this._content.get(so.instanceID);
		this.updateTransform(so);

		obj.Color = so.image.color;
		obj.Width = so.image.width;
		obj.Height = so.image.height;
		obj.BorderWidth = so.image.borderWidth;
		obj.CornerTL = so.image.radius.x;
		obj.CornerTR = so.image.radius.y;
		obj.CornerBR = so.image.radius.z;
		obj.CornerBL = so.image.radius.w;
		obj.rebuild();
	}

	updateTransform = (so: SceneObject) => {
		const obj = this._content.get(so.instanceID);
		if (obj == undefined) return;

		obj.position.copy(this.getPosition(so));//.set(so.transform.position.x, so.transform.position.y, so.transform.position.z);
		obj.rotation.set(so.transform.rotation.x * Math.PI / 180, so.transform.rotation.y * Math.PI / 180, so.transform.rotation.z * Math.PI / 180);
		obj.scale.set(so.transform.scale.x, so.transform.scale.y, so.transform.scale.z);

		var childs = this._sceneService.content.filter(o => o.parent == so.instanceID);
		for (var c of childs) {
			this.updateTransform(c);
		}
	}

	getPosition(so: SceneObject) {
		var pos: Vector3 = new Vector3().copy(so.transform.position);
		if (so.parent != '') {
			pos.add(this.getPosition(this.findSceneObject(so.parent)))
		}

		return pos;
	}

	findSceneObject(instanceID: string): SceneObject {
		return this._sceneService.content.find(c => c.instanceID == instanceID);
	}

	layout() {
		super.layout();

	}

	render = () => {
		super.render();
	}
}

export default Viewport;