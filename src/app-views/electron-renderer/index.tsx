import React from "react";
import { createRoot } from "react-dom/client";
import { $, append } from '../common/core/dom';
import SceneService from '../common/services/scene/sceneService';
import SocketClientService from '../common/services/socketClient/socketClientService';
import { register3DComponent } from './core/registry';
import { ServicesProvider } from './services/serviceContext';
import ProceduralImage from './workench/components/viewport/items/proceduralImage';
import Text from './workench/components/viewport/items/text';
import Viewport from './workench/components/viewport/viewport';
import DesktopUI from './workench/desktopUI';
import imageDrawer from './workench/parts/objectproperties/objectDrawer/component/imageDrawer';
import textDrawer from './workench/parts/objectproperties/objectDrawer/component/textDrawer';

register3DComponent( 'image', ProceduralImage, imageDrawer )
register3DComponent( 'text', Text, textDrawer);

class DesktopWorkbench {
	workbenchContainer: HTMLElement;
	viewportContainer: HTMLElement;

	socket: SocketClientService;
	sceneService: SceneService;

	constructor() {

	}

	startup = () => {
		this.socket = new SocketClientService("localhost", 'app');
		this.sceneService = new SceneService(this.socket);

		this.workbenchContainer = append(document.body, $('div#workbench'));
		this.buildUi();
	}

	buildUi() {
		const root = createRoot(this.workbenchContainer);
		root.render(
			<ServicesProvider value={{
				sceneService: this.sceneService
			}}>
				<Viewport />
				<DesktopUI />
			</ServicesProvider>
		);
	}
}

window.onload = new DesktopWorkbench().startup;