import React from "react";
import { createRoot } from "react-dom/client";
import Workbench from './scripts/workbench';

function startup() {
	const container = document.createElement('div');
	document.body.appendChild(container);

	const root = createRoot(container!);
	root.render(<Workbench />);
}

window.onload = startup;