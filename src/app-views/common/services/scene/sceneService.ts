import { SceneObject } from '../../../../types/scene';
import { createUUID } from '../../core/id';
import Signal from '../../core/signal';
import SocketClientService from '../socketClient/socketClientService';

const kc_sceneServiceChannel: string = 'scene:rpc';
class SceneService {

	content: SceneObject[];

	private _onSOAdded: Signal<SceneObject> = new Signal<SceneObject>();
	public get onSOAdded() { return this._onSOAdded; }

	constructor(socket: SocketClientService) {
		this.content = [];

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
				if (typeof _target[propKey] === 'object')
					return _target[propKey];

				return async function (...args: any[]) {
					if (propKey.toString().startsWith('rpc_')) {
						socket.ws.emit(kc_sceneServiceChannel, [propKey, ...args]);
					} else {
						_target[propKey](...args);
					}

				}
			}
		});
	}

	rpc_createObject(objStr: string) {
		var so: SceneObject = {
			instanceID: createUUID(),
			name: objStr,
			transform: { x: 0, y: 0, z: 0 }
		}

		this.content.push(so);
		this._onSOAdded.fire(so);
	}
}

export default SceneService;