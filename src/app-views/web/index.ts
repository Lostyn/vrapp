import SocketClientService from '../common/services/socketClient/socketClientService';
import Viewport from './workbench/viewport';

class App {
	_viewport: Viewport;

	_socket: SocketClientService;

	startup() {
		const container = document.createElement('div');
		container.classList.add('viewport');
		document.body.appendChild(container);

		const host = window.location.hostname;
		this._socket = new SocketClientService(host, 'web');
		// this._stateService = new StateService(this._socket);

		this._viewport = new Viewport(container);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new App().startup();
})