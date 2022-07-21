import React from "react";
import { createRoot } from "react-dom/client";
import { $, append } from '../common/core/dom';
import SceneService from '../common/services/scene/sceneService';
import SocketClientService from '../common/services/socketClient/socketClientService';
import DesktopUI from './workench/DesktopUI';
import DesktopViewport from './xr/DesktopViewport';

class DesktopWorkbench {
	uiContainer: HTMLElement;
	viewportContainer: HTMLElement;

	viewport: DesktopViewport;

	socket: SocketClientService;
	sceneService: SceneService;

	constructor() {

	}

	startup = () => {
		this.socket = new SocketClientService("localhost", 'app');
		this.sceneService = new SceneService(this.socket);

		this.viewportContainer = append(document.body, $('div#viewport'));
		this.uiContainer = append(document.body, $('div#ui'));

		this.viewport = new DesktopViewport(this.viewportContainer, this.sceneService);

		this.buildUi();
	}

	buildUi() {
		const root = createRoot(this.uiContainer!);
		root.render(
			<DesktopUI
				sceneService={this.sceneService}
			/>
		);
	}
}

window.onload = new DesktopWorkbench().startup;