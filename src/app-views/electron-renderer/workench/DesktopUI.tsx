import React from "react";
import { CreateCommand } from '../../common/command/createCommand';
import SocketClientService from '../../common/services/socketClient/socketClientService';


type IProps = {
	socket: SocketClientService
}

const DesktopUI = (props: IProps) => {
	const createTest = () => {
		const cmd = new CreateCommand('cube');
		props.socket.sendCommand(cmd);
	};

	return (
		<div id="ui">
			<button onClick={createTest}>Create</button>
		</div>
	)
}

export default DesktopUI;