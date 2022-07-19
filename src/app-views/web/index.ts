import SocketClientService from '../common/services/socketClient/socketClientService';
import VRViewport from './workbench/vrViewport';

class App {
	_viewport: VRViewport;

	_socket: SocketClientService;

	startup() {
		const container = document.createElement('div');
		container.classList.add('viewport');
		document.body.appendChild(container);

		const host = window.location.hostname;
		this._socket = new SocketClientService(host, 'web');
		// this._stateService = new StateService(this._socket);

		this._viewport = new VRViewport(container);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new App().startup();
})