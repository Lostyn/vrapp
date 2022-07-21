import * as THREE from 'three';
import InfiniteGridHelper from '../internal/infiniteGridHelper';

export default abstract class BaseScene {
	private _parent: HTMLElement;
	private _scene: THREE.Scene;
	private _camera: THREE.PerspectiveCamera;
	private _renderer: THREE.WebGLRenderer;

	public get parent() { return this._parent; }
	public get scene() { return this._scene; }
	public get camera() { return this._camera; }
	public get renderer() { return this._renderer; }

	private _clock;
	private _grid: THREE.Mesh;

	constructor(parent: HTMLElement) {
		this._parent = parent;
		this._scene = new THREE.Scene;
		this._scene.background = new THREE.Color(0x505050);

		this._camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 100);

		this._renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this._renderer.setSize(parent.clientWidth, parent.clientHeight);

		this._scene.add(this.camera);
		this._parent.appendChild(this.renderer.domElement);

		this._clock = new THREE.Clock();

		window.addEventListener('resize', this.resize, false);

		this._renderer.setAnimationLoop(this.render);
		this.layout();
	}

	protected layout() {
		this.camera.position.set(0, 1.7, -2);

		this._grid = new InfiniteGridHelper();
		this.scene.add(this._grid);

		this.scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

		const light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 1, 1).normalize();
		this.scene.add(light);
	}

	resize = () => {
		const { clientHeight, clientWidth } = this._parent;

		this._camera.aspect = clientWidth / clientHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(clientWidth, clientHeight);
	}

	protected render = () => {
		const delta = this._clock.getDelta();

		this._renderer.render(this._scene, this._camera);
	}
}