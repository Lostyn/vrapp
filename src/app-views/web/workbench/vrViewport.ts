import * as THREE from 'three';
import BaseScene from '../../common/xr/baseScene';
import { VRButton } from '../vr/VRButton';

class VRViewport extends BaseScene {
	_vrButton: VRButton;
	_controller: THREE.XRTargetRaySpace;

	constructor(parent: HTMLElement) {
		super(parent);

		this._vrButton = new VRButton(this.renderer, parent);
	}

	layout() {
		super.layout();

		this.renderer.xr.enabled = true;

		this.setControllers();
	}

	setControllers() {
		// Headset
		this._controller = this.renderer.xr.getController(0);
		// this._controller.addEventListener('connected', (event) => {
		// 	this._controller.add(this.buildController(event.data));
		// });
		// this._controller.addEventListener('disconnected', () => {
		// 	this._controller.remove(this._controller.children[0]);
		// });
		this.scene.add(this._controller);


	}

	buildController = (data) => {
		console.log(data.targetRayMode);

		let geometry, material;
		switch (data.targetRayMode) {
			case 'tracked-pointer':
				geometry = new THREE.BufferGeometry();
				geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, - 1], 3));
				geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));

				material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending });

				return new THREE.Line(geometry, material);

			case 'gaze':
				geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, - 1);
				material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true });
				return new THREE.Mesh(geometry, material);
		}
	}
}

export default VRViewport;