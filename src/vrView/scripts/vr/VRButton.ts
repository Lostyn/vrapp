class VRButton {
	_button: HTMLElement;
	_xrSessionIsGranted = false;
	_renderer: THREE.WebGLRenderer;
	_currentSession;

	constructor(renderer: THREE.WebGLRenderer, parent: HTMLElement) {
		this._renderer = renderer;
		this._button = document.createElement('button');


		if ('xr' in navigator) {
			this._button.id = 'VRButton';
			this._button.style.display = 'none';

			this.stylizeElement(this._button);
			navigator.xr.isSessionSupported('immersive-vr').then((supported) => {

				supported ? this.showEnterVR() : this.showWebXRNotFound();

				if (supported && this._xrSessionIsGranted) {
					this._button.click();
				}

			}).catch(this.showVRNotAllowed);

			parent.appendChild(this._button);
		} else {
			const message = document.createElement('a');
			if (window.isSecureContext === false) {

				message.href = document.location.href.replace(/^http:/, 'https:');
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			this.stylizeElement(message);

			parent.appendChild(message);
		}
	}

	registerSessionGrantedListener() {
		if ('xr' in navigator) {
			if (/WebXRViewer\//i.test(navigator.userAgent)) return;

			navigator.xr.addEventListener('sessiongranted', () => {
				this._xrSessionIsGranted = true;
			});
		}
	}

	onSessionStarted = async (session) => {
		session.addEventListener('end', this.onSessionEnded);

		await this._renderer.xr.setSession(session);
		this._button.textContent = 'EXIT VR';

		this._currentSession = session;
	}

	onSessionEnded = () => {
		this._currentSession.removeEventListener('end', this.onSessionEnded);

		this._button.textContent = 'ENTER VR';

		this._currentSession = null;
	}

	showEnterVR = () => {
		this._button.style.display = '';

		this._button.style.cursor = 'pointer';
		this._button.style.left = 'calc(50% - 50px)';
		this._button.style.width = '100px';

		this._button.textContent = 'ENTER VR';

		this._button.onclick = this.onButtonClick;

	}

	onButtonClick = () => {
		if (this._currentSession === undefined) {

			// WebXR's requestReferenceSpace only works if the corresponding feature
			// was requested at session creation time. For simplicity, just ask for
			// the interesting ones as optional features, but be aware that the
			// requestReferenceSpace call will fail if it turns out to be unavailable.
			// ('local' is always available for immersive sessions and doesn't need to
			// be requested separately.)

			const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] };
			navigator.xr.requestSession('immersive-vr', sessionInit).then(this.onSessionStarted);

		} else {
			this._currentSession.end();
		}
	}

	disableButton = () => {
		this._button.style.display = '';

		this._button.style.cursor = 'auto';
		this._button.style.left = 'calc(50% - 75px)';
		this._button.style.width = '150px';

		this._button.onmouseenter = null;
		this._button.onmouseleave = null;

		this._button.onclick = null;
	}

	showWebXRNotFound = () => {
		this.disableButton();

		this._button.textContent = 'VR NOT SUPPORTED';
	}

	showVRNotAllowed = (exception) => {
		this.disableButton();

		console.warn('Exception when trying to call xr.isSessionSupported', exception);

		this._button.textContent = exception; //'VR NOT ALLOWED';
	}

	stylizeElement = (element: HTMLElement) => {
		element.style.position = 'absolute';
		element.style.bottom = '20px';
		element.style.padding = '12px 6px';
		element.style.border = '1px solid #fff';
		element.style.borderRadius = '4px';
		element.style.background = 'rgba(0,0,0,0.1)';
		element.style.color = '#fff';
		element.style.font = 'normal 13px sans-serif';
		element.style.textAlign = 'center';
		element.style.opacity = '0.5';
		element.style.outline = 'none';
		element.style.zIndex = '999';
	}
}

export { VRButton };