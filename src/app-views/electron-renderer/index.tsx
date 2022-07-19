import React from "react";
import { createRoot } from "react-dom/client";
import SocketClientService from '../common/services/socketClient/socketClientService';
import Workbench from './workench/workbench';

function startup() {

	const socket = new SocketClientService("localhost", 'app');

	const container = document.createElement('div');
	document.body.appendChild(container);

	const root = createRoot(container!);
	root.render(
		<Workbench />
	);
}

window.onload = startup;