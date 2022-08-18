import SceneService from '../common/services/scene/sceneService';
import SocketClientService from '../common/services/socketClient/socketClientService';
import VRViewport from './workbench/vrViewport';

class App {
	_viewport: VRViewport;

	_socket: SocketClientService;
	_sceneService: SceneService;

	startup() {
		const container = document.createElement('div');
		container.classList.add('viewport');
		document.body.appendChild(container);

		const host = window.location.hostname;
		this._socket = new SocketClientService(host, 'web');
		this._sceneService = new SceneService(this._socket);

		this._viewport = new VRViewport(container, this._sceneService);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new App().startup();
})