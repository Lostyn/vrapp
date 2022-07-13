import Viewport from './scripts/viewport';

class App {
	_viewport: Viewport;

	startup() {
		const container = document.createElement('div');
		container.classList.add('viewport');
		document.body.appendChild(container);

		this._viewport = new Viewport(container);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new App().startup();
})