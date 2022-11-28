import { useEffect } from 'react';
import { Color, Vector2, Vector3, Vector4 } from 'three';
import { AllSceneObject, SceneObject, SceneObjectId } from '../../../../types/scene';
import { createUUID } from '../../core/id';
import Signal from '../../core/signal';
import SocketClientService from '../socketClient/socketClientService';
import { DefaultShapeObject, DefaultSceneObject, DefaultTextObject, DefaultImageObject } from './defaultSceneObject';

const kc_sceneServiceChannel: string = 'scene:rpc';
class SceneService {

	content: SceneObject[];
	selected: string;

	private _onSOAdded: Signal<SceneObject> = new Signal<SceneObject>();
	public get onSOAdded() { return this._onSOAdded; }

	private _onSOUpdated: Signal<SceneObject> = new Signal<SceneObject>();
	public get onSOUpdated() { return this._onSOUpdated; }

	private _onSelect: Signal = new Signal();
	public get onSelect() { return this._onSelect; }

	private _onHierarchyChanged: Signal = new Signal();
	public get onHierarchyChanged() { return this._onHierarchyChanged; }

	constructor(socket: SocketClientService) {
		this.content = [];
		// this.content = sample();

		socket.ws.on(kc_sceneServiceChannel, (...args) => {
			const params = args[0];

			const fn = params.splice(0, 1)[0];
			if (this[fn] != null) {
				if (typeof this[fn] === 'function') {
					this[fn](...params);
				}
			}
		})

		return new Proxy(this, {
			get(_target: SceneService, propKey: PropertyKey) {
				if (typeof _target[propKey] != 'function')
					return _target[propKey];

				if (propKey.toString().startsWith('rpc_')) {
					return async function (...args: any[]) {
						socket.ws.emit(kc_sceneServiceChannel, [propKey, ...args]);
					}
				} else {
					return function (...args: any[]) {
						return _target[propKey](...args);
					}
				}
			}
		});
	}

	getSceneObject(instanceID: string): SceneObject {
		return this.content.find(o => o.instanceID === instanceID);
	}

	rpc_createObject(type: SceneObjectId, instanceID: string) {
		let so = {};

		switch (type) {
			case 'shape':
				so = Object.assign({}, DefaultSceneObject(instanceID, type), DefaultShapeObject);
				break;
			case 'text':
				so = Object.assign({}, DefaultSceneObject(instanceID, type), DefaultTextObject);
				break;
			case 'image':
				so = Object.assign({}, DefaultSceneObject(instanceID, type), DefaultImageObject);
				break;
		}

		this.content.push(so as SceneObject);
		this._onSOAdded.fire(so as SceneObject);
		this.selectObject((so as SceneObject).instanceID);
	}

	rpc_updateObject(instanceID: string, patch: any) {
		const obj = this.content.find(o => o.instanceID == instanceID);
		if (obj != undefined) {
			Object.assign(obj, patch);
			this._onSOUpdated.fire(obj);
		}
	}

	rpc_setParent(instanceID: string, parentID: string) {
		const obj = this.content.find(o => o.instanceID == instanceID);
		obj.parent = parentID;
		this._onHierarchyChanged.fire();

	}

	selectObject(instanceId: string) {
		this.selected = instanceId;
		this._onSelect.fire();
	}
}

export default SceneService;