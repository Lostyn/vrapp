import { Vector3 } from 'three';
import BaseScene from '../../common/xr/scene/baseScene';
import { OrbitControls } from '../../common/xr/controls/orbitControls';
import Viewport from '../../common/xr/scene/viewport';
import SceneService from '../../common/services/scene/sceneService';
import OrientationGizmo from '../../common/xr/internal/OrientationGizmo';

class DesktopViewport extends Viewport {
	controls: OrbitControls;
	gizmos: OrientationGizmo;

	constructor(parent: HTMLElement, sceneService: SceneService) {
		super(parent, sceneService);
	}

	layout() {
		super.layout();

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.target = new Vector3(0, 1.7, 0);
		this.controls.update();

		this.gizmos = new OrientationGizmo(this.controls, this.parent);
	}

	render = () => {
		super.render();
	}
}

export default DesktopViewport;