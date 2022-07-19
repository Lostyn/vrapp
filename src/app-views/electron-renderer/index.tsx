import React from "react";
import { createRoot } from "react-dom/client";
import { $, append } from '../common/core/dom';
import SocketClientService from '../common/services/socketClient/socketClientService';
import DesktopUI from './workench/DesktopUI';
import DesktopViewport from './xr/DesktopViewport';

class DesktopWorkbench {
	uiContainer: HTMLElement;
	viewportContainer: HTMLElement;

	socket: SocketClientService;
	viewport: DesktopViewport;

	constructor() {

	}

	startup = () => {
		this.socket = new SocketClientService("localhost", 'app');

		this.viewportContainer = append(document.body, $('div#viewport'));
		this.uiContainer = append(document.body, $('div#ui'));

		this.viewport = new DesktopViewport(this.viewportContainer);

		this.buildUi();
	}

	buildUi() {
		const root = createRoot(this.uiContainer!);
		root.render(
			<DesktopUI socket={this.socket}/>
		);
	}
}

window.onload = new DesktopWorkbench().startup;