import SocketClientService from '../app/renderer/scripts/services/SocketClientService';
import { StateService } from '../app/renderer/scripts/services/syncedState/stateService';
import Viewport from './scripts/viewport';

class App {
	_viewport: Viewport;

	_socket: SocketClientService;
	_stateService: StateService;

	startup() {
		const container = document.createElement('div');
		container.classList.add('viewport');
		document.body.appendChild(container);

		const host = window.location.hostname;
		this._socket = new SocketClientService(host);
		// this._stateService = new StateService(this._socket);

		this._viewport = new Viewport(container);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new App().startup();
})