import SocketClientService from '../socketClient/socketClientService';

const kc_sceneServiceChannel: string = 'scene:rpc';
class SceneService {

	constructor(socket: SocketClientService) {
		socket = socket;

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
				return async function (...args: any[]) {
					if (propKey.toString().startsWith('rpc_')) {
						socket.ws.emit(kc_sceneServiceChannel, [propKey, ...args]);
					} else {
						_target[propKey](...args);
					}
					return void 0;
				}
			}
		});
	}

	rpc_createObject(objStr: string) {
		console.log('call from rpc', objStr);
	}

	private createObject(objStr: string) {

	}
}

export default SceneService;