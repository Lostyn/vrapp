import React from "react";
import { createRoot } from "react-dom/client";
import { $, append } from '../common/core/dom';
import SceneService from '../common/services/scene/sceneService';
import SocketClientService from '../common/services/socketClient/socketClientService';
import ServiceProvider from './services/serviceContext';
import TreeTest from './sndbox/tree-test';
import Viewport from './workench/components/viewport/viewport';
import DesktopUI from './workench/desktopUI';

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
			// <TreeTest/>
			<ServiceProvider services={{
				sceneService: this.sceneService
			}}>
				<Viewport />
				<DesktopUI />
			</ServiceProvider>
		);
	}
}

window.onload = new DesktopWorkbench().startup;