
import { io, Socket } from "socket.io-client";
import { Command, _command } from '../../command/command';


import '../../command/createCommand';

class SocketClientService {
	_ws: Socket;

	public get ws() { return this._ws };

	constructor(ip: string, coType: string) {
		this._ws = io(`wss://${ip}:3002`, {
			secure: true,
			reconnectionDelayMax: 10000,
			rejectUnauthorized: false, // Important for self-signed cert !!!!!
			query: {
				"type": coType
			}
		});

		this._ws.on("connect", () => {
			console.log(this._ws.id);

			this._ws.on('command', this.onCommand);
		});

		this._ws.on('error', (err) => {
			console.error(err);
		})
	}

	sendCommand(cmd: Command<any>) {
		this._ws.emit('command', cmd.toMsg());
	}

	onCommand = (...args) => {
		console.log('onCommand', args);
		const { type, payload } = args[0];

		const ctor = _command.commands[type];
		const cmd = new ctor(...payload);
		console.log(cmd);
	}

	close = () => {

	}


}

export default SocketClientService;