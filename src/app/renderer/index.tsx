import React from "react";
import { createRoot } from "react-dom/client";
import SocketClientService from './scripts/services/SocketClientService';
import { StateService } from './scripts/services/syncedState/stateService';

import Workbench from './scripts/workbench';

function startup() {

	const socket = new SocketClientService("localhost");
	const stateService = new StateService(socket);

	const container = document.createElement('div');
	document.body.appendChild(container);

	const root = createRoot(container!);
	root.render(
		<Workbench
			stateService={stateService}
		/>
	);

	setTimeout(() => {
		stateService.dispatchCommand({ type: 'test', data: 'toto' });
	}, 1000);
}

window.onload = startup;