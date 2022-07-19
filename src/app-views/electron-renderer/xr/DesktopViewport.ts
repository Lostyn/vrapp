import BaseScene from '../../common/xr/baseScene';
import { OrbitControls } from '../../common/xr/orbitControls';

class DesktopViewport extends BaseScene {
	controls: OrbitControls;

	constructor(parent: HTMLElement) {
		super(parent);
	}

	layout() {
		super.layout();

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}

	render = () => {
		super.render();
	}
}

export default DesktopViewport;