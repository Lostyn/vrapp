import { Quaternion, Vector3 } from 'three';
import { SceneObject } from '../../../../types/scene';
import SceneService from '../../services/scene/sceneService';
import { RotateAroundPivot } from '../../utils/math3d';
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
		sceneService.onHierarchyChanged.register(this.onHierarchyChanged_handler);

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
		obj.Radius = so.image.radius;
		obj.rebuild();
	}

	onHierarchyChanged_handler = () => {
		for (let i = 0; i < this._sceneService.content.length; i++) {
			this.updateTransform(this._sceneService.content[i]);
		}
	}

	updateTransform = (so: SceneObject) => {
		const obj = this._content.get(so.instanceID);
		if (obj == undefined) return;

		obj.position.copy(this.getPosition(so));

		var rot = this.getRotation(so);
		obj.rotation.set(rot.x, rot.y, rot.z);

		var childs = this._sceneService.content.filter(o => o.parent == so.instanceID);
		for (var c of childs) {
			this.updateTransform(c);
		}
	}

	getPosition(so: SceneObject) {
		var pos: Vector3 = new Vector3().copy(so.transform.position);
		if (so.parent != '') {
			var parent = this.findSceneObject(so.parent);
			var parentPos = this.getPosition(parent);

			var parentRot = this.getRotation(parent);
			pos = RotateAroundPivot(pos, parentRot);
			pos.add(parentPos);
		}

		return pos;
	}

	getRotation(so: SceneObject) {
		var rot: Vector3 = new Vector3().set(
			so.transform.rotation.x * Math.PI / 180,
			so.transform.rotation.y * Math.PI / 180,
			so.transform.rotation.z * Math.PI / 180
		);

		if (so.parent != '') {
			rot.add(this.getRotation(this.findSceneObject(so.parent)))
		}

		return rot;
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